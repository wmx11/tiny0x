import { CampaignCard } from '@/components/Cards/Cards';
import generalRoutes from '@/routes/general';
import { Title } from '@mantine/core';
import React from 'react';

const LiveCampaigns = () => {
  return (
    <div>
      <Title className="mb-4">Live Campaigns</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CampaignCard
          image="https://pancakeswap.finance/_next/image?url=https%3A%2F%2Fstatic-nft.pancakeswap.com%2Fmainnet%2F0x59b39a2092cda9C590B1576EE5AA204a487e46e6%2Fbanner-sm.png&w=750&q=75"
          title="Campaign Name"
          href={generalRoutes.campaign.replace('${id}', 'test')}
        />
        <CampaignCard
          image="https://pancakeswap.finance/_next/image?url=https%3A%2F%2Fstatic-nft.pancakeswap.com%2Fmainnet%2F0x59b39a2092cda9C590B1576EE5AA204a487e46e6%2Fbanner-sm.png&w=750&q=75"
          title="Campaign Name"
          href={generalRoutes.campaign.replace('${id}', 'test')}
        />
        <CampaignCard
          image="https://pancakeswap.finance/_next/image?url=https%3A%2F%2Fstatic-nft.pancakeswap.com%2Fmainnet%2F0x59b39a2092cda9C590B1576EE5AA204a487e46e6%2Fbanner-sm.png&w=750&q=75"
          title="Campaign Name"
          href={generalRoutes.campaign.replace('${id}', 'test')}
        />
      </div>
    </div>
  );
};

export default LiveCampaigns;