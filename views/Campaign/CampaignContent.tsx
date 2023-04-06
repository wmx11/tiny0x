import { Text } from '@mantine/core';
import { Campaign } from '@prisma/client';
import React from 'react';

const CampaignContent = ({ campaign }: { campaign: Campaign }) => {
  return (
    <>
      <div className="mb-8">
        <Text weight={700} className="mb-2">
          About the campaign
        </Text>
        <Text>{campaign?.description || '...'}</Text>
      </div>
    </>
  );
};

export default CampaignContent;
