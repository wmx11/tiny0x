// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ProfileSchema } from '@/schema/profile';
import { createOrUpdateProfileByUser } from '@/services/profile';
import request, { Auth } from '@/utils/api/request';
import { response } from '@/utils/api/response';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestHandler = request(req, res);
  const responseHandler = response(res);

  const createOrUpdateProfile = async (auth: Auth) => {
    const data = await createOrUpdateProfileByUser({
      ...(req.body as ProfileSchema & {
        isUpdate: boolean;
        profileId?: string;
      }),
      userId: auth.id,
    });

    if (!data.ok) {
      return responseHandler.badRequest(data.errorMessage);
    }

    return responseHandler.ok(data.results);
  };

  return requestHandler.signedPost(createOrUpdateProfile);
}
