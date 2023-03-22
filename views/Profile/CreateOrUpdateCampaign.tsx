import CampaignForm from '@/components/Campaign/CampaignForm';
import { GlassCard } from '@/components/Cards/Cards';
import GoBack from '@/components/GoBack';
import { Text, Title } from '@mantine/core';
import { FC } from 'react';

type CreateOrUpdateCampaignTypes = {
  isUpdate?: boolean;
};

const CreateOrUpdateCampaign: FC<CreateOrUpdateCampaignTypes> = ({
  isUpdate,
}) => {
  return (
    <div className="max-w-[720px]">
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
        <CampaignForm isUpdate={isUpdate} />
      </GlassCard>
    </div>
  );
};

export default CreateOrUpdateCampaign;
