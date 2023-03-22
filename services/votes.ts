import prisma from '@/prisma/prisma';
import { Votes as VotesActions } from '@/types/Actions';
import { ResultsOrError } from '@/types/Results';
import { Votes } from '@prisma/client';

export type VoteForCampaignByIdTypes = {
  campaignId: string;
  userId: string;
  type: VotesActions.No | VotesActions.Yes;
  review?: string;
};

export const VOTE_FOR_CAMPAIGN_BY_ID = 'voteForCampaignById';
export const voteForCampaignById = async ({
  campaignId,
  userId,
  type,
  review,
}: VoteForCampaignByIdTypes): Promise<ResultsOrError<Votes>> => {
  try {
    if (!campaignId) {
      return { ok: false, errorMessage: 'Missing Campaign ID' };
    }

    const vote = await prisma?.votes.create({
      data: {
        campaignId,
        review,
        type,
        userId,
      },
    });

    return { ok: true, results: vote as Votes };
  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error as string };
  }
};

export type GetVotesByCampaignIdReturnTypes = {
  group: {
    type: VotesActions;
    _count: number;
  }[];
};

export const GET_VOTES_BY_CAMPAIGN_ID = 'getVotesByCampaignId';
export const getVotesByCampaignId = async (
  campaignId: string
): Promise<ResultsOrError<GetVotesByCampaignIdReturnTypes>> => {
  try {
    const votes = await prisma?.votes.groupBy({
      by: ['type'],
      _count: true,
      where: {
        id: campaignId,
      },
    });

    return {
      ok: true,
      results: votes as unknown as GetVotesByCampaignIdReturnTypes,
    };
  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error as string };
  }
};
