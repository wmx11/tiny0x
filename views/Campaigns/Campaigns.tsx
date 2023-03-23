import { YellowBackdrop } from '@/components/Backdrop';
import { Section } from '@/components/Section';
import { Container, Text, Title } from '@mantine/core';
import LiveCampaigns from './LiveCampaigns';
import PendingCampaigns from './PendingCampaigns';

const Campaigns = () => {
  return (
    <Section backdrop={<YellowBackdrop />} className="min-h-screen">
      <Container className="py-10">
        <div className="mb-16">
          <Title className="mb-2">Discover Tiny0x Campaigns!</Title>
          <Text>
            Browse around the Tiny0x profile list and find other profiles you
            could connect with! Have you had previous experience with the
            person? Feel free to leave a positive review!
          </Text>
        </div>
        <div className="mb-16">
          <PendingCampaigns />
        </div>
        <div className="mb-16">
          <LiveCampaigns />
        </div>
      </Container>
    </Section>
  );
};

export default Campaigns;
