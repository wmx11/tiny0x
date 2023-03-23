import prisma from '@/prisma/prisma';
import { CampaignSchema } from '@/schema/campaign';
import { ResultsOrError } from '@/types/Results';
import { Campaign } from '@prisma/client';
import { ObjectId } from 'bson';

export const CREATE_OR_UPDATE_CAMPAIGN = 'createOrUpdateCampaign';
export const createOrUpdateCampaign = async (
  data: CampaignSchema & {
    campaignId?: string;
    userId: string;
  }
): Promise<ResultsOrError<Campaign>> => {
  try {
    if (!data.title) {
      return { ok: false, errorMessage: 'Title is too short.' };
    }

    const dataCopy = { ...data };

    delete dataCopy.campaignId;

    const campaign = await prisma?.campaign.upsert({
      where: {
        id: data?.campaignId || new ObjectId().toString(),
      },
      create: {
        ...dataCopy,
        budget: parseInt(dataCopy?.budget as string, 10),
        duration: parseInt(dataCopy?.duration as string, 10),
      },
      update: {
        ...dataCopy,
        budget: parseInt(dataCopy?.budget as string, 10),
        duration: parseInt(dataCopy?.duration as string, 10),
      },
    });

    return { ok: true, results: campaign as Campaign };
  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error as string };
  }
};

export const GET_CAMPAIGNS_BY_USER_ID = 'getCampaignsByUserId';
export const getCampaignsByUserId = async (
  userId: string
): Promise<ResultsOrError<Campaign[]>> => {
  try {
    const campaigns = await prisma?.campaign.findMany({
      where: {
        userId,
      },
      orderBy: {
        date_created: 'desc',
      },
    });

    return { ok: true, results: campaigns as Campaign[] };
  } catch (error) {
    return { ok: false, errorMessage: error as string };
  }
};

export const GET_PENDING_CAMPAIGNS = 'getPendingCampaigns';
export const getPendingCampaigns = async (): Promise<
  ResultsOrError<Campaign[]>
> => {
  try {
    const campaigns = await prisma?.campaign.findMany({
      where: {
        enabled: true,
        isLive: false,
      },
      orderBy: {
        date_created: 'desc',
      },
    });

    return { ok: true, results: campaigns as Campaign[] };
  } catch (error) {
    return { ok: false, errorMessage: error as string };
  }
};

export const GET_LIVE_CAMPAIGNS = 'getLiveCampaigns';
export const getLiveCampaigns = async (): Promise<
  ResultsOrError<Campaign[]>
> => {
  try {
    const campaigns = await prisma?.campaign.findMany({
      where: {
        enabled: true,
        isLive: true,
      },
      orderBy: {
        date_created: 'desc',
      },
    });

    return { ok: true, results: campaigns as Campaign[] };
  } catch (error) {
    return { ok: false, errorMessage: error as string };
  }
};

export const GET_CAMPAIGN_BY_CAMPAIGN_ID = 'getCampaignByCampaignId';
export const getCampaignByCampaignId = async (
  campaignId: string
): Promise<ResultsOrError<Campaign>> => {
  try {
    const campaign = await prisma?.campaign.findUnique({
      where: {
        id: campaignId,
      },
    });

    return { ok: true, results: campaign as Campaign };
  } catch (error) {
    return { ok: false, errorMessage: error as string };
  }
};
