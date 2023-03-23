import { OrangeBackdrop } from '@/components/Backdrop';
import { Section } from '@/components/Section';
import { Container, Text, Title } from '@mantine/core';
import React from 'react';

const About = () => {
  return (
    <Section backdrop={<OrangeBackdrop />} className="min-h-screen">
      <Container className="py-10">
        <Title className="mb-2">About Tiny0x</Title>
        <Text>About Text</Text>
      </Container>
    </Section>
  );
};

export default About;
