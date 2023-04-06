import { Badge, Title } from '@mantine/core';
import { Campaign } from '@prisma/client';
import React from 'react';

const CampaignHeader = ({ campaign }: { campaign: Campaign }) => {
  return (
    <>
      <div className="mb-8 max-h-[256px] bg-red-200 rounded-md w-full overflow-hidden">
        <img
          src={campaign?.campaign_image_url || ''}
          alt={campaign?.title}
          className="w-full h-full"
        />
      </div>
      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          <Title>{campaign?.title}</Title>
          {campaign?.isLive ? (
            <Badge variant="filled" color="teal">
              Live
            </Badge>
          ) : (
            <Badge variant="filled" color="red">
              Awaiting Approval
            </Badge>
          )}
        </div>
      </div>
    </>
  );
};

export default CampaignHeader;
