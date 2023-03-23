// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  getCampaignsByUserId,
  GET_CAMPAIGNS_BY_USER_ID
} from '@/services/campaign';
import request, { Auth } from '@/utils/api/request';
import { response } from '@/utils/api/response';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestHandler = request(req, res);
  const responseHandler = response(res);

  const campaignController = async (auth: Auth) => {
    const { type } = req.body as {
      type: string;
    };

    switch (type) {
      case GET_CAMPAIGNS_BY_USER_ID:
        const campaigns = await getCampaignsByUserId(auth.id);
        return responseHandler.ok(campaigns);
      default:
        return responseHandler.ok(null);
    }
  };

  return requestHandler.signedPost(campaignController);
}
