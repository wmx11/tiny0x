import { OrangeBackdrop } from '@/components/Backdrop';
import GoBack from '@/components/GoBack';
import { Section } from '@/components/Section';
import { Container } from '@mantine/core';
import { Campaign as CampaignTypes } from '@prisma/client';
import { FC } from 'react';
import CampaignContent from './CampaignContent';
import CampaignHeader from './CampaignHeader';
import CampaignVoting from './CampaignVoting';

type CampaignPageTypes = {
  campaign: CampaignTypes;
};

const Campaign: FC<CampaignPageTypes> = ({ campaign }) => {
  return (
    <Section backdrop={<OrangeBackdrop />} className="min-h-screen">
      <Container className="py-10">
        <GoBack />
        <CampaignHeader campaign={campaign} />
        <CampaignContent campaign={campaign} />
        <CampaignVoting campaign={campaign} />
      </Container>
    </Section>
  );
};

export default Campaign;
