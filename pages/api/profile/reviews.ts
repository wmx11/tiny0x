// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/prisma/prisma';
import {
  getAverageRatingByprofile,
  getRecentReviewsByProfile,
  getReviewsByProfile,
  getTotalReviewsCountByProfile,
  GET_AVERAGE_RATING_BY_PROFILE,
  GET_RECENT_REVIEWS_BY_PROFILE,
  GET_REVIEWS_BY_PROFILE,
  GET_TOTAL_REVIEWS_COUNT_BY_PROFILE,
  leaveReviewForProfile,
  LEAVE_REVIEW_FOR_PROFILE,
} from '@/services/review';
import request, { Auth } from '@/utils/api/request';
import { response } from '@/utils/api/response';
import { Review } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestHandler = request(req, res);
  const responseHandler = response(res);

  const reviewsController = async (auth: Auth) => {
    const { type, data } = req.body;

    const profile = await prisma?.user.findUnique({
      where: {
        id: auth.id,
      },
      select: {
        profile: {
          select: {
            id: true,
          },
        },
      },
    });

    const profileId = profile?.profile?.id || '';

    switch (type) {
      case GET_REVIEWS_BY_PROFILE:
        const reviews = await getReviewsByProfile(profileId);
        return responseHandler.ok(reviews);
      case GET_RECENT_REVIEWS_BY_PROFILE:
        const recentReviews = await getRecentReviewsByProfile(profileId);
        return responseHandler.ok(recentReviews);
      case GET_TOTAL_REVIEWS_COUNT_BY_PROFILE:
        const reviewsCount = await getTotalReviewsCountByProfile(profileId);
        return responseHandler.ok(reviewsCount);
      case GET_AVERAGE_RATING_BY_PROFILE:
        const averageReviews = await getAverageRatingByprofile(profileId);
        return responseHandler.ok(averageReviews);
      case LEAVE_REVIEW_FOR_PROFILE:
        const newReview = await leaveReviewForProfile({
          userId: auth.id,
          ...data,
        } as Review);
        return responseHandler.ok(newReview);
      default:
        return responseHandler.ok(null);
    }
  };

  return requestHandler.signedPost(reviewsController);
}
