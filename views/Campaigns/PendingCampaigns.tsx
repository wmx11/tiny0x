import { CampaignCard } from '@/components/Cards/Cards';
import generalRoutes from '@/routes/general';
import { Title } from '@mantine/core';
import React from 'react';

const PendingCampaigns = () => {
  return (
    <div>
      <Title className="mb-4">Pending Campaigns</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CampaignCard
          image="https://pancakeswap.finance/_next/image?url=https%3A%2F%2Fstatic-nft.pancakeswap.com%2Fmainnet%2F0x012f90E777bdb2B4CA132f0f6EB9e7959075E9b2%2Fbanner-sm.png&w=750&q=75"
          title="Campaign Name"
          href={generalRoutes.campaign.replace('${id}', 'test')}
        />
        <CampaignCard
          image="https://pancakeswap.finance/_next/image?url=https%3A%2F%2Fstatic-nft.pancakeswap.com%2Fmainnet%2F0x012f90E777bdb2B4CA132f0f6EB9e7959075E9b2%2Fbanner-sm.png&w=750&q=75"
          title="Campaign Name"
          href={generalRoutes.campaign.replace('${id}', 'test')}
        />
        <CampaignCard
          image="https://pancakeswap.finance/_next/image?url=https%3A%2F%2Fstatic-nft.pancakeswap.com%2Fmainnet%2F0x012f90E777bdb2B4CA132f0f6EB9e7959075E9b2%2Fbanner-sm.png&w=750&q=75"
          title="Campaign Name"
          href={generalRoutes.campaign.replace('${id}', 'test')}
        />
      </div>
    </div>
  );
};

export default PendingCampaigns;
