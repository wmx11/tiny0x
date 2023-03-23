import { YellowBackdrop } from '@/components/Backdrop';
import { GlassCard, NFTCard } from '@/components/Cards/Cards';
import Hero from '@/components/Hero';
import { Section } from '@/components/Section';
import { Accordion, Container, Text, Title } from '@mantine/core';
import { PinkBackdrop } from '../../components/Backdrop/Backdrop';
import FAQ from './FAQ';
import HowToUse from './HowToUse';
import Roadmap from './Roadmap';
import Usecases from './Usecases';

const Home = () => {
  return (
    <>
      <Hero />
      <Section backdrop={<PinkBackdrop animate />}>
        <Container className="py-32 min-h-screen flex flex-col justify-center">
          <div>
            <Title className="mb-8 text-5xl" align="center">
              NFT-powered link management solution
            </Title>
            <Text size="xl" align="center">
              Tiny0x, the revolutionary link shortening service that mints a
              unique NFT for every shortened link. With Tiny0x, NFT holders can
              choose to track click statistics, run ads on their links, and get
              paid for each impression or click on ads. Say goodbye to boring
              links and hello to Tiny0x - the future of link shortening in Web3.
              A comprehensive solution to help make every point of connection
              between your content and your audience more powerful.
            </Text>
          </div>
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
