import prisma from '@/prisma/prisma';
import { ResultsOrError } from '@/types/Results';
import { Campaign, Prisma } from '@prisma/client';

export type CreateOrUpdateCampaignTypes = {
  campaignId?: string;
  data: Prisma.CampaignCreateInput;
};

export const CREATE_OR_UPDATE_CAMPAIGN = 'createOrUpdateCampaign';
export const createOrUpdateCampaign = async ({
  campaignId,
  data,
}: CreateOrUpdateCampaignTypes): Promise<ResultsOrError<Campaign>> => {
  try {
    const campaign = await prisma?.campaign.upsert({
      where: {
        id: campaignId || undefined,
      },
      create: {
        ...data,
      },
      update: {
        ...data,
      },
    });

    return { ok: true, results: campaign as Campaign };
  } catch (error) {
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
