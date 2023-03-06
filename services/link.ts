import prisma from '@/prisma/prisma';
import { DEFAULT_TAKE } from '@/utils/contstants';

export const getLinksByUser = async (userId: string) => {
  try {
    const links = await prisma?.link.findMany({
      where: {
        userId,
      },
      orderBy: {
        date_created: 'desc',
      },
    });

    return links;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getRecentLinksByUser = async (userId: string) => {
  try {
    const links = await prisma?.link.findMany({
      where: {
        userId,
      },
      orderBy: {
        date_created: 'desc',
      },
      take: DEFAULT_TAKE,
    });
    return links;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getTotalLinksCountByUser = async (userId: string) => {
  try {
    const count = await prisma?.link.count({
      where: {
        userId,
      },
    });

    return count;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const tinifyLink = async () => {};
