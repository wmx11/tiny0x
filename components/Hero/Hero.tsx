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
        <Container size="md" className="z-10">
          <div>
            <Title align="center" className="text-6xl mb-4">
              Turn your links into Tiny NFTs!
            </Title>
            <Text align="center" className="text-xl mb-4">
              Your links, your NFTs, your revenue
            </Text>
            <Tinify />
          </div>
        </Container>
        <div className="absolute flex flex-col gap-6 md:left-10 h-[100%] bottom-0 items-center w-full opacity-10 md:opacity-30 verticalReel">
          <NFTCard code={codeBlock} />
          <NFTCard code={codeBlock} />
          <NFTCard code={codeBlock} />
          <NFTCard code={codeBlock} />
          <NFTCard code={codeBlock} />
          <NFTCard code={codeBlock} />
        </div>
        <div className="hidden md:flex absolute flex-col gap-6 right-10 h-[100%] bottom-0 opacity-30 verticalReel">
          <NFTCard code={codeBlock} />
          <NFTCard code={codeBlock} />
          <NFTCard code={codeBlock} />
          <NFTCard code={codeBlock} />
          <NFTCard code={codeBlock} />
          <NFTCard code={codeBlock} />
        </div>
      </div>

      <OrangeBackdrop />
    </div>
  );
};

export default Hero;
