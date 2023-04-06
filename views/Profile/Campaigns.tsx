import { PrimaryButton } from '@/components/Buttons/Buttons';
import generalRoutes from '@/routes/general';
import Icons from '@/utils/icons';
import { Text, Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import MyCampaigns from './MyCampaigns';

const Campaigns = () => {
  return (
    <div>
      <div className="mb-8">
        <Title className="mb-2">My Campaigns</Title>
        <Text className="mb-8">
          Create, update, and monitor your Tiny0x campaigns.
        </Text>
        <Link href={generalRoutes.profile.createCampaign} passHref>
          <PrimaryButton rightIcon={<Icons.Add />} component="a" size="lg">
            Create a new campaign
          </PrimaryButton>
        </Link>
      </div>
      <div>
        <MyCampaigns />
      </div>
    </div>
  );
};

export default Campaigns;
