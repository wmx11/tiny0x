// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  voteForCampaignById,
  VoteForCampaignByIdTypes,
  VOTE_FOR_CAMPAIGN_BY_ID,
} from '@/services/votes';
import request, { Auth } from '@/utils/api/request';
import { response } from '@/utils/api/response';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestHandler = request(req, res);
  const responseHandler = response(res);

  const campaignVotesController = async (auth: Auth) => {
    const { type } = req.body as {
      type: string;
    } & VoteForCampaignByIdTypes;

    switch (type) {
      case VOTE_FOR_CAMPAIGN_BY_ID:
        const vote = await voteForCampaignById({
          ...req.body,
          userId: auth.id,
        });
        if (!vote.ok) {
          return responseHandler.badRequest(vote.errorMessage);
        }
        return responseHandler.ok(vote);
      default:
        return responseHandler.ok(null);
    }
  };

  return requestHandler.signedPost(campaignVotesController);
}
