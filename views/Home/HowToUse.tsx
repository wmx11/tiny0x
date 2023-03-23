import { OrangeBackdrop } from '@/components/Backdrop';
import { Section } from '@/components/Section';
import { Container, Text, Title } from '@mantine/core';
import React from 'react';

const HowToUse = () => {
  return (
    <Section>
      <Container className="py-10">
        <Title align="center" color="white">
          How to use Tiny0x
        </Title>
        <div>
          <Text>Put in the link you want to tinify</Text>
          <Text>Select your options</Text>
          <Text>Connect your wallet and Sign it</Text>
          <Text>Click "Tinify" to mint your NFT</Text>
          <Text>Use your Tiny link and share it with your peers</Text>
        </div>
      </Container>
    </Section>
  );
};

export default HowToUse;
