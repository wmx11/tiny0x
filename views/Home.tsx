import Hero from '@/components/Hero';
import Tinify from '@/components/Tinify';
import { Container } from '@mantine/core';

const Home = () => {
  return (
    <>
      <Hero />
      <Container>
        <div className="py-24">
          <Tinify />
        </div>
      </Container>
    </>
  );
};

export default Home;
