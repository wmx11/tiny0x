// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getProfileByUser } from '@/services/profile';
import request from '@/utils/api/request';
import { response } from '@/utils/api/response';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestHandler = request(req, res);
  const responseHandler = response(res);

  const getProfile = async () => {
    const { userId } = req.body as { userId: string };

    if (!userId) {
      return responseHandler.badRequest('User ID not found');
    }

    const data = await getProfileByUser(userId);

    return responseHandler.ok(data);
  };

  return requestHandler.post(getProfile);
}
