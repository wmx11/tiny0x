// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CampaignSchema } from '@/schema/campaign';
import { createOrUpdateCampaign } from '@/services/campaign';
import request, { Auth } from '@/utils/api/request';
import { response } from '@/utils/api/response';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestHandler = request(req, res);
  const responseHandler = response(res);

  const createOrUpdateCampaignHandler = async (auth: Auth) => {
    const data = await createOrUpdateCampaign({
      ...(req.body as CampaignSchema & {
        campaignId?: string;
      }),
      userId: auth.id,
    });

    if (!data.ok) {
      return responseHandler.badRequest(data.errorMessage);
    }

    return responseHandler.ok(data.results);
  };

  return requestHandler.signedPost(createOrUpdateCampaignHandler);
}
