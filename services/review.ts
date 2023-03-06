import prisma from '@/prisma/prisma';
import { DEFAULT_TAKE } from '@/utils/contstants';
import { Review } from '@prisma/client';

export const getReviewsByProfile = async (profileId: string) => {
  try {
    const reviews = await prisma?.review.findMany({
      where: {
        profileId,
      },
      orderBy: {
        date_created: 'desc',
      },
    });

    return reviews;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getRecentReviewsByProfile = async (profileId: string) => {
  try {
    const reviews = await prisma?.review.findMany({
      where: {
        profileId,
      },
      orderBy: {
        date_created: 'desc',
      },
      take: DEFAULT_TAKE,
    });

    return reviews;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getTotalReviewsCountByProfile = async (profileId: string) => {
  try {
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
