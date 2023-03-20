import prisma from '@/prisma/prisma';
import { ProfileSchema } from '@/schema/profile';
import { Actions } from '@/types/Actions';
import { ProfileLink } from '@/types/Profile';
import { ResultsOrError } from '@/types/Results';
import { Profile } from '@prisma/client';
import { tinifyLink, updateTinyLink } from './link';

export const GET_PROFILE_BY_USER = 'getProfileByUser';
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

export const GET_PROFILES = 'getProfiles';
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

export type ProfileStats = {
  linksCount: number | undefined;
  profileImpressionsCount: number | undefined;
  profileReviewsCount: number | undefined;
  totalLinkClicksCount: number | undefined;
};

export const GET_PROFILE_STATS_BY_USER = 'getProfileStatsByUser';
export const getProfileStatsByUser = async (
  userId: string
): Promise<ProfileStats | undefined> => {
  try {
    const profile = await prisma?.profile.findUnique({
      where: {
        userId,
      },
    });

    const linksCount = await prisma?.link.count({
      where: {
        userId,
      },
    });

    const profileImpressionsCount = await prisma?.action.count({
      where: {
        profileId: profile?.id,
        type: Actions.Impression,
      },
    });

    const profileReviewsCount = await prisma?.review.count({
      where: {
        profileId: profile?.id,
      },
    });

    const totalLinkClicksCount = await prisma?.action.count({
      where: {
        link: {
          userId,
        },
        type: Actions.Click,
      },
    });

    return {
      linksCount,
      profileImpressionsCount,
      profileReviewsCount,
      totalLinkClicksCount,
    };
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const CREATE_OR_UPDATE_PROFILE_BY_USER = 'createOrUpdateProfileByUser';
export const createOrUpdateProfileByUser = async (
  data: ProfileSchema & {
    isUpdate?: boolean;
    userId: string;
    profileId?: string;
  }
): Promise<ResultsOrError<Profile>> => {
  try {
    if (!data?.username) {
      return { ok: false, errorMessage: 'Please provide a valid username' };
    }

    const existingProfile = await prisma?.profile.findUnique({
      where: {
        username: data?.username,
      },
    });

    if (
      (!data?.isUpdate && existingProfile) ||
      (data?.isUpdate &&
        existingProfile?.id &&
        existingProfile?.id !== data?.profileId)
    ) {
      return {
        ok: false,
        errorMessage: `Profile with the username ${data?.username} already exists. Please choose another one.`,
      };
    }

    /**
     * @desc - Here we are creating trackable links for profiles.
     * Links that do not have Track Metrics or Does Accept Ads checked will be returned as is
     * Other Links will be converted to trackable links with an Alias
     */
    const links: ProfileLink[] = [];

    for (const link of data?.profile_links) {
      // Generic link data
      const linkData = {
        userId: data?.userId,
        profileId: data?.profileId,
        enabled: true,
        title: link?.label,
        target: link?.target,
        doesAcceptAds: link?.doesAcceptAds,
        trackMetrics: link?.trackMetrics,
      };

      if ((link?.trackMetrics || link?.doesAcceptAds) && !link?.linkId) {
        // If the link has Track Metrics or Does Accept Ads checked but has no Link ID - Create a trackable link and return it
        const results = await tinifyLink({
          ...linkData,
        });

        if (results.ok) {
          links.push({
            ...link,
            alias: results.results.slug,
            linkId: results.results.id,
          });
        }
      } else if (link?.linkId && data?.isUpdate) {
        // If the link has an existing Link ID and it's a Profile Update, update the trackable link target and return it
        const results = await updateTinyLink({
          ...linkData,
          linkId: link?.linkId,
        });

        if (results.ok) {
          links.push({
            ...link,
            alias: results.results.slug,
            linkId: results.results.id,
          });
        }
      } else {
        // If the link has not checked Track Metrics or Accept Ads, just return the link
        links.push(link);
      }
    }

    // Create a copy of Data
    const dataCopy = { ...data };

    // Remove the isUpdate and profileId variables because they do not belong in the .upsert statement
    delete dataCopy.isUpdate;
    delete dataCopy.profileId;

    const profile = await prisma?.profile.upsert({
      where: {
        userId: dataCopy?.userId,
      },
      create: {
        ...dataCopy,
        profile_links: links,
        userId: dataCopy.userId,
      },
      update: {
        ...dataCopy,
        profile_links: links,
      },
    });

    return { ok: true, results: profile as Profile };
  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error as string };
  }
};

export const deleteProfile = async () => {};
