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

export const createOrUpdateProfileByUser = async () => {};
export const deleteProfile = async () => {};
