import { Badge, Title } from '@mantine/core';
import React from 'react';

const CampaignHeader = () => {
  return (
    <>
      <div className="mb-8 h-[256px] bg-red-200 rounded-md w-full overflow-hidden">
        <img
          src="https://pancakeswap.finance/_next/image?url=https%3A%2F%2Fstatic-nft.pancakeswap.com%2Fmainnet%2F0x59b39a2092cda9C590B1576EE5AA204a487e46e6%2Fbanner-lg.png&w=2048&q=75"
          alt=""
        />
      </div>
      <div className="mb-8">
        <div className="flex gap-4">
          <Title>Campaign Title</Title>
          <Badge variant="filled" color="red">
            Pending
          </Badge>
        </div>
      </div>
    </>
  );
};

export default CampaignHeader;
