import { Code, Container, Text, Title } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import { OrangeBackdrop } from '../Backdrop';
import { GlassCard, NFTCard } from '../Cards/Cards';
import Tinify from '../Tinify/Tinify';

const Hero = () => {
  const codeBlock = `{ 
  name: 'Blob #1',
  target: 'https://your-website.com/',
  doesAcceptPromo: true,
  eyes: 'excited',
  item: 'paper',
  background: 'sunset',
}`;
  
  return (
    <div className="overflow-hidden relative">
      <div className="text-white bg-darkPurple/80 min-h-screen relative backdrop-blur-xl z-10 flex items-center">
        <Container className="grid grid-cols-[1fr,320px] gap-24">
          <div className="flex items-center">
            <div>
              <Title className="mb-4 text-7xl leading-tight" order={1}>
                Turn your links into{' '}
                <Text
                  span
                  weight={700}
                  variant="gradient"
                  gradient={{ from: 'pink', to: 'violet' }}
                >
                  TINY NFTs
                </Text>
              </Title>
              <Title className="mb-8 text-3xl leading-tight" order={2}>
                Unique & owned by you
              </Title>
              <Tinify />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NFTCard code={codeBlock} />
            <NFTCard code={codeBlock} />
            <NFTCard code={codeBlock} />
          </div>
        </Container>
      </div>
      <OrangeBackdrop />
    </div>
  );
};

export default Hero;
