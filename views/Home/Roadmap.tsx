import { OrangeBackdrop } from '@/components/Backdrop';
import { Section } from '@/components/Section';
import { Container, Title } from '@mantine/core';
import React from 'react';

const Roadmap = () => {
  return (
    <Section backdrop={<OrangeBackdrop />}>
      <Container className="py-10">
        <Title align="center" color="white">
          Tiny Roadmap
        </Title>

        <div></div>
      </Container>
    </Section>
  );
};

export default Roadmap;
