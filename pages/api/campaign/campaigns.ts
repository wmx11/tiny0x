// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  getLiveCampaigns,
  getPendingCampaigns,
  GET_LIVE_CAMPAIGNS,
  GET_PENDING_CAMPAIGNS,
} from '@/services/campaign';
import {
  getVotesByCampaignId,
  GET_VOTES_BY_CAMPAIGN_ID,
} from '@/services/votes';
import request from '@/utils/api/request';
import { response } from '@/utils/api/response';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestHandler = request(req, res);
  const responseHandler = response(res);

  const campaignsController = async () => {
    const { type, campaignId } = req.body as {
      type: string;
      campaignId: string;
    };

    switch (type) {
      case GET_PENDING_CAMPAIGNS:
        const pendingCampaigns = await getPendingCampaigns();
        return responseHandler.ok(pendingCampaigns);
      case GET_LIVE_CAMPAIGNS:
        const liveCampaigns = await getLiveCampaigns();
        return responseHandler.ok(liveCampaigns);
      case GET_VOTES_BY_CAMPAIGN_ID:
        const campaignVotes = await getVotesByCampaignId(campaignId);
        return responseHandler.ok(campaignVotes);

      default:
        return responseHandler.ok(null);
    }
  };

  return requestHandler.post(campaignsController);
}
