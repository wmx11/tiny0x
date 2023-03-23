// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  getCampaignsByUserId,
  GET_CAMPAIGNS_BY_USER_ID,
} from '@/services/campaign';
import {
  getProfileByUser,
  getProfileStatsByUser,
  GET_PROFILE_BY_USER,
  GET_PROFILE_STATS_BY_USER,
} from '@/services/profile';
import {
  getAverageRatingByprofile,
  GET_AVERAGE_RATING_BY_PROFILE,
} from '@/services/review';
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
      case GET_PROFILE_BY_USER:
        const profile = await getProfileByUser(userId);
        return responseHandler.ok(profile);
      case GET_AVERAGE_RATING_BY_PROFILE:
        const averageRating = await getAverageRatingByprofile(profileId);
        return responseHandler.ok(averageRating);
      case GET_PROFILE_STATS_BY_USER:
        const profileStats = await getProfileStatsByUser(userId);
        return responseHandler.ok(profileStats);
      case GET_CAMPAIGNS_BY_USER_ID:
        const campaigns = await getCampaignsByUserId(userId);
        return responseHandler.ok(campaigns);
      default:
        return responseHandler.ok(null);
    }
  };

  return requestHandler.post(profileController);
}
