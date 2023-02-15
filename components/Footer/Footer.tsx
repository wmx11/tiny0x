import { Container, Text } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div data-component="footer" className="bg-gray-100 py-24">
      <Container className="flex items-center gap-4">
        <div>
          <Text weight={700}>Tiny0x</Text>
          <Link href="#">About</Link>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
