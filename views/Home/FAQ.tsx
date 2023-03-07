import { Section } from '@/components/Section';
import { Accordion, Container, Title } from '@mantine/core';
import React from 'react';

const FAQ = () => {
  return (
    <Section>
      <Container className="py-10">
        <Title align="center" color="white" className="mb-8">
          Frequently asked questions
        </Title>
        <Accordion chevronPosition="left" variant="separated" radius="md">
          <Accordion.Item value="linkShortener">
            <Accordion.Control>What is a link shortener?</Accordion.Control>
            <Accordion.Panel></Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="shortLinks">
            <Accordion.Control>
              What are the benefits of short links?
            </Accordion.Control>
            <Accordion.Panel></Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="tinyProfile">
            <Accordion.Control>What is a tiny profile?</Accordion.Control>
            <Accordion.Panel></Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="tinyProfileBenefits">
            <Accordion.Control>
              What are the benefits of a tiny profile?
            </Accordion.Control>
            <Accordion.Panel></Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="whyUse">
            <Accordion.Control>Why use Tiny0x?</Accordion.Control>
            <Accordion.Panel></Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>
    </Section>
  );
};

export default FAQ;
