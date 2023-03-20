import { YellowBackdrop } from '@/components/Backdrop';
import { GlassCard } from '@/components/Cards/Cards';
import { Section } from '@/components/Section';
import { Container, Text, Title } from '@mantine/core';

const Campaigns = () => {
  return (
    <Section backdrop={<YellowBackdrop />}>
      <Container className="py-10">
        <div className="mb-16">
          <Title className="mb-2">Discover Tiny0x Campaigns!</Title>
          <Text>
            Browse around the Tiny0x profile list and find other profiles you
            could connect with! Have you had previous experience with the
            person? Feel free to leave a positive review!
          </Text>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard className="w-full">
            <div className="rounded-md bg-zinc-500 h-[125px] mb-2"></div>
            <div>
              <Text align="right" weight={600} className="text-xl">
                Some Project Campaign
              </Text>
              <Text>
                <Text span size="xs" color="dimmed">
                  Volume{' '}
                </Text>
                Tesxt
              </Text>
            </div>
          </GlassCard>
        </div>
      </Container>
    </Section>
  );
};

export default Campaigns;
