import prisma from '@/prisma/prisma';
import apiRoutes from '@/routes/api';
import { ProfileLink } from '@/types/Profile';
import { Profile } from '@prisma/client';
import axios from 'axios';

export const getProfileByUser = async (userId: string) => {
  const profile = await prisma?.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
};

export const requestProfileByUser = async (
  userId: string
): Promise<
  (Omit<Profile, 'profile_links'> & { profile_links: ProfileLink[] }) | null
> => {
  const { data } = await axios.post(apiRoutes.profile.profile, {
    userId,
  });

  if (!data) {
    return null;
  }

  return data.data;
};

export const createOrUpdateProfileByUser = async () => {};

export const mintNFTForProfile = async () => {};
export const deleteProfile = async () => {};
