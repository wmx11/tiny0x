import { CampaignCard } from '@/components/Cards/Cards';
import apiRoutes from '@/routes/api';
import generalRoutes from '@/routes/general';
import { ResultsOrError } from '@/types/Results';
import { signedRequest } from '@/utils/api/signedRequest';
import { LoadingOverlay, Text, Title } from '@mantine/core';
import { Campaign } from '@prisma/client';
import React from 'react';
import useSWR from 'swr';

const LiveCampaigns = () => {
  const { data, isLoading } = useSWR<{
    data: { data: ResultsOrError<Campaign[]> };
  }>('/live-campaigns', () =>
    signedRequest({
      type: 'post',
      url: apiRoutes.campaign.campaigns,
      data: {
        type: 'getLiveCampaigns',
      },
    })
  );

  const campaigns = data?.data.data.ok ? data?.data.data.results : [];

  return (
    <div>
      <Title order={2} className="mb-4">
        Live Campaigns
      </Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {campaigns && campaigns.length > 0 ? (
          campaigns.map((item, index) => {
            return (
              <CampaignCard campaign={item} key={`live_campaign_${index}`} />
            );
          })
        ) : (
          <Text>There are no live campaigns</Text>
        )}
        <LoadingOverlay visible={isLoading} />
      </div>
    </div>
  );
};

export default LiveCampaigns;
