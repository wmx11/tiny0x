// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getProfileByUser } from '@/services/profile';
import { getAverageRatingByprofile } from '@/services/review';
import request from '@/utils/api/request';
import { response } from '@/utils/api/response';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestHandler = request(req, res);
  const responseHandler = response(res);

  const profileController = async () => {
    const { userId, profileId, type } = req.body as {
      userId: string;
      profileId: string;
      type: string;
    };

    switch (type) {
      case 'getProfileByUser':
        const profile = await getProfileByUser(userId);
        return responseHandler.ok(profile);
      case 'getAverageRatingByprofile':
        const averageRating = await getAverageRatingByprofile(profileId);
        return responseHandler.ok(averageRating);
      default:
        return responseHandler.ok(null);
    }
  };

  return requestHandler.post(profileController);
}
