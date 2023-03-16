import prisma from '@/prisma/prisma';
import { DEFAULT_TAKE } from '@/utils/contstants';
import { Review } from '@prisma/client';

export const GET_REVIEWS_BY_PROFILE = 'getReviewsByProfile';
export const getReviewsByProfile = async (profileId: string) => {
  try {
    if (!profileId) {
      return null;
    }

    const reviews = await prisma?.review.findMany({
      where: {
        profileId,
      },
      orderBy: {
        date_created: 'desc',
      },
      include: {
        reviewer: {
          select: {
            address: true,
          },
        },
      },
    });

    return reviews;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GET_RECENT_REVIEWS_BY_PROFILE = 'getRecentReviewsByProfile';
export const getRecentReviewsByProfile = async (profileId: string) => {
  try {
    if (!profileId) {
      return null;
    }

    const reviews = await prisma?.review.findMany({
      where: {
        profileId,
      },
      orderBy: {
        date_created: 'desc',
      },
      include: {
        reviewer: {
          select: {
            address: true,
          },
        },
      },
      take: DEFAULT_TAKE,
    });

    return reviews;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GET_TOTAL_REVIEWS_COUNT_BY_PROFILE =
  'getTotalReviewsCountByProfile';
export const getTotalReviewsCountByProfile = async (profileId: string) => {
  try {
    if (!profileId) {
      return null;
    }

    const count = await prisma?.review.count({
      where: {
        profileId,
      },
    });

    return count;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GET_AVERAGE_RATING_BY_PROFILE = 'getAverageRatingByprofile';
export const getAverageRatingByprofile = async (profileId: string) => {
  try {
    if (!profileId) {
      return null;
    }

    const avg = await prisma?.review.aggregate({
      where: {
        profileId,
      },
      _avg: {
        rating: true,
      },
    });

    return avg?._avg?.rating || 0;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const LEAVE_REVIEW_FOR_PROFILE = 'leaveReviewForProfile';
export const leaveReviewForProfile = async ({
  rating,
  review,
  userId,
  profileId,
}: Review) => {
  try {
    if (review && review.length > 250) {
      return { errorMessage: 'Review cannot be longer than 250 characters.' };
    }

    const newReview = await prisma?.review.create({
      data: {
        rating,
        review,
        userId,
        profileId,
      },
    });

    return newReview;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteReview = async () => {};
