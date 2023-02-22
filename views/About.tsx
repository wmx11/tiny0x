import { OrangeBackdrop } from '@/components/Backdrop';
import { Section } from '@/components/Section';
import { Container, Text, Title } from '@mantine/core';
import React from 'react';

const About = () => {
  return (
    <Section backdrop={<OrangeBackdrop />} className="text-white">
      <Container className="py-10">
        <Title className="mb-4">About Tiny0x</Title>
        <Text>About Text</Text>
      </Container>
    </Section>
  );
};

export default About;
