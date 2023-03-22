import { OrangeBackdrop } from '@/components/Backdrop';
import GoBack from '@/components/GoBack';
import { Section } from '@/components/Section';
import { MAX_CHARACTERS } from '@/utils/contstants';
import Icons from '@/utils/icons';
import {
  Badge,
  Button,
  Container,
  Progress,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import CampaignContent from './CampaignContent';
import CampaignHeader from './CampaignHeader';
import CampaignVoting from './CampaignVoting';

const Campaign = () => {
  return (
    <Section backdrop={<OrangeBackdrop />}>
      <Container className="py-10">
        <GoBack />
        <CampaignHeader />
        <CampaignContent />
        <CampaignVoting />
      </Container>
    </Section>
  );
};

export default Campaign;
