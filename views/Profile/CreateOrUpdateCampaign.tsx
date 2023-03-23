import CampaignForm from '@/components/Campaign/CampaignForm';
import { GlassCard } from '@/components/Cards/Cards';
import GoBack from '@/components/GoBack';
import { Text, Title } from '@mantine/core';
import { Campaign } from '@prisma/client';
import { FC } from 'react';

type CreateOrUpdateCampaignTypes = {
  isUpdate?: boolean;
  campaign?: Campaign;
};

const CreateOrUpdateCampaign: FC<CreateOrUpdateCampaignTypes> = ({
  isUpdate,
  campaign,
}) => {
  return (
    <div className="md:max-w-[720px]">
      <GoBack />
      <div className="mb-4 text-white">
        <Title>
          {isUpdate ? 'Update your campaign' : 'Create a new campaign'}
        </Title>
        {isUpdate ? null : (
          <Text>
            You will mint a unique Tiny0x Profile NFT with your profile
            metadata. Think Linktree but Web3!
          </Text>
        )}
      </div>
      <GlassCard>
        <CampaignForm isUpdate={isUpdate} campaign={campaign} />
      </GlassCard>
    </div>
  );
};

export default CreateOrUpdateCampaign;
