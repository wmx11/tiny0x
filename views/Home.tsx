import { YellowBackdrop } from '@/components/Backdrop';
import Hero from '@/components/Hero';
import { Section } from '@/components/Section';
import { Accordion, Container, Text, Title } from '@mantine/core';

const Home = () => {
  return (
    <>
      <Hero />
      <Section backdrop={<YellowBackdrop />}>
        <Container className="py-10">
          <Title align="center" color="white">
            Easy link management for Web3
          </Title>
          <Text align="center" color="white">
            A comprehensive solution to help make every point of connection
            between your content and your audience more powerful.
          </Text>
        </Container>
      </Section>
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
    </>
  );
};

export default Home;
