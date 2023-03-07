import { YellowBackdrop } from '@/components/Backdrop';
import Hero from '@/components/Hero';
import { Section } from '@/components/Section';
import { Accordion, Container, Text, Title } from '@mantine/core';
import FAQ from './FAQ';
import HowToUse from './HowToUse';
import Roadmap from './Roadmap';
import Usecases from './Usecases';

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
      <Usecases />
      <HowToUse />
      <Roadmap />
      <FAQ />
    </>
  );
};

export default Home;
