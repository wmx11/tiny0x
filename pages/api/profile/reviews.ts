// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/prisma/prisma';
import {
  getRecentReviewsByProfile,
  getReviewsByProfile,
  getTotalReviewsCountByProfile,
  leaveReviewForProfile,
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
      case 'getReviewsByProfile':
        const reviews = await getReviewsByProfile(profileId);
        return responseHandler.ok(reviews);
      case 'getRecentReviewsByProfile':
        const recentReviews = await getRecentReviewsByProfile(profileId);
        return responseHandler.ok(recentReviews);
      case 'getTotalReviewsCountByProfile':
        const reviewsCount = await getTotalReviewsCountByProfile(profileId);
        return responseHandler.ok(reviewsCount);
      case 'leaveReviewForProfile':
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
