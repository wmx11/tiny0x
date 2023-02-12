import { Button, Container } from '@mantine/core';
import React from 'react';

const Navigation = () => {
  return (
    <div className="bg-zinc-50">
      <Container className="flex justify-between py-5">
        <div>Test</div>
        <nav>
          <a href="">Test</a>
          <a href="">Test</a>
          <a href="">Test</a>
          <a href="">Test</a>
        </nav>
        <div>
          <Button>Connect</Button>
        </div>
      </Container>
    </div>
  );
};

export default Navigation;
