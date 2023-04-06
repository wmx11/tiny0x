import { OrangeBackdrop } from '@/components/Backdrop';
import { GlassCard } from '@/components/Cards/Cards';
import GoBack from '@/components/GoBack';
import { Section } from '@/components/Section';
import ShillBox from '@/components/ShillBox';
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
    <Section backdrop={<OrangeBackdrop animate />} className="min-h-screen">
      <Container className="py-10">
        <GoBack />
        <div className="grid grid-cols-1 md:grid-cols-[1fr,300px] gap-6">
          <GlassCard>
            <CampaignHeader campaign={campaign} />
            <CampaignContent campaign={campaign} />
            <GlassCard>
              <CampaignVoting campaign={campaign} />
            </GlassCard>
          </GlassCard>
          <ShillBox />
        </div>
      </Container>
    </Section>
  );
};

export default Campaign;
