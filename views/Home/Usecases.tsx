import { OrangeBackdrop } from '@/components/Backdrop';
import { GlassCard } from '@/components/Cards/Cards';
import { Section } from '@/components/Section';
import { Container, Text, Title } from '@mantine/core';
import React from 'react';

const Usecases = () => {
  return (
    <Section backdrop={<OrangeBackdrop animate />} className="min-h-screen">
      <Container className="py-10">
        <div className="mb-24">
          <Title align="center" className="text-5xl">
            Tiny0x use cases
          </Title>
        </div>

        <div className="columns-2 gap-8">
          <div className="w-full mb-6">
            <GlassCard className="flex flex-col gap-4">
              <Title>Tracking & Planning</Title>
              <Text>
                With Tiny0x, you can create a unique NFT for each shortened
                link, allowing you to track clicks and impressions in real-time.
                As you track the performance of your links, you can plan and
                adjust your marketing strategy accordingly. With the added
                feature of running ads on your links, you can further optimize
                your strategy to maximize your revenue. Say goodbye to guesswork
                and hello to data-driven decision making with Tiny0x.
              </Text>
            </GlassCard>
          </div>
          <div className="w-full mb-6">
            <GlassCard className="flex flex-col gap-4">
              <Title>Campaign Management</Title>
              <Text>
                Tiny0x allows you to create marketing campaigns and run them on
                all links that accept advertisement. Create, manage, and plan
                your marketing campaigns easily with Tiny0x. Marketing campaigns
                will go through two phases. The first phase will introduce the
                campaign to Tiny0x users where they will be able to vote on your
                campaign. If you campaign passes it will be run live and pushed
                to all Tiny0x links.
              </Text>
            </GlassCard>
          </div>
          <div className="w-full mb-6">
            <GlassCard className="flex flex-col gap-4">
              <Title>Profile Management</Title>
              <Text>
                You can create and manage your social profile on Tiny0x. Here
                you can create a unique profile that you could share with your
                followers, and other people. Upload images, choose awesome
                titles, describe yourself, and put any links you’d like for
                people to see. Every profile mints a unique Profile NFT. Track
                profile impressions and stay on top with your new Tiny0x
                Profile!
              </Text>
            </GlassCard>
          </div>
          <div className="w-full mb-6">
            <GlassCard className="flex flex-col gap-4">
              <Title>Link Shortening</Title>
              <Text>
                Tiny0x allows you to not only shorten your long URLs, but also
                mint unique NFTs that are connected with that URL. Shorten your
                links so they are easier to manage and track. Shorter links
                don’t overburden the user and you can really save up on those
                character count limitations!
              </Text>
            </GlassCard>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Usecases;
