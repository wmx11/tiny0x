import prisma from '@/prisma/prisma';

export const getProfileByUser = async (userId: string) => {
  try {
    if (!userId) {
      return null;
    }

    const profile = await prisma?.profile.findUnique({
      where: {
        userId,
      },
    });

    return profile;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getProfiles = async () => {
  try {
    const profiles = await prisma?.profile.findMany({
      orderBy: {
        date_created: 'desc',
      },
    });

    return profiles;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createOrUpdateProfileByUser = async () => {};
export const deleteProfile = async () => {};
