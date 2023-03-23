import prisma from '@/prisma/prisma';
import { Votes as VotesActions } from '@/types/Actions';
import { ResultsOrError } from '@/types/Results';
import { checkCanVoteAfterOneDay } from '@/utils/utils';
import { Votes } from '@prisma/client';

export type VoteForCampaignByIdTypes = {
  campaignId: string;
  userId: string;
  voteType: VotesActions.No | VotesActions.Yes;
  review?: string;
};

export const VOTE_FOR_CAMPAIGN_BY_ID = 'voteForCampaignById';
export const voteForCampaignById = async ({
  campaignId,
  userId,
  voteType,
  review,
}: VoteForCampaignByIdTypes): Promise<ResultsOrError<Votes>> => {
  try {
    if (!campaignId) {
      return { ok: false, errorMessage: 'Missing Campaign ID' };
    }

    // Check if the user can vote again in the 24 hour window
    const lastVote = await prisma?.votes.findFirst({
      where: {
        campaignId,
        userId,
      },
      orderBy: {
        date_created: 'desc',
      },
    });

    const canVote = checkCanVoteAfterOneDay(lastVote?.date_created);

    if (!canVote) {
      return { ok: false, errorMessage: 'You can only vote every 24 hours.' };
    }

    const vote = await prisma?.votes.create({
      data: {
        campaignId,
        review,
        type: voteType,
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
  [VotesActions.No]: {
    _count: number;
    value: number;
  };
  [VotesActions.Yes]: {
    _count: number;
    value: number;
  };
  // group: {
  //   type: VotesActions;
  //   _count: number;
  // }[];
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
        campaignId,
      },
    });

    const no = votes?.find((item) => item.type === 0)?._count || 0;
    const yes = votes?.find((item) => item.type === 1)?._count || 0;
    const total = no + yes;

    return {
      ok: true,
      results: {
        0: {
          _count: no,
          value: (no / total) * 100,
        },
        1: {
          _count: yes,
          value: (yes / total) * 100,
        },
      },
    };
  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error as string };
  }
};
