import Icons from '@/utils/icons';
import { Container, Text } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { YellowBackdrop } from '../Backdrop';
import Logo from '../Logo';

const Footer = () => {
  return (
    <footer className="overflow-hidden">
      <div className="bg-darkPurple backdrop-blur-xl py-24 z-10">
        <Container className="flex gap-24 z-10 relative">
          <div>
            <div className="mb-4">
              <div className="mb-2">
                <Link href="/">
                  <Logo />
                </Link>
              </div>
              <Text size="xs" color="dimmed">
                Tiny0x. Made with love by MB Modiggo.
              </Text>
            </div>
            <div className="flex items-center gap-6 text-2xl">
              <a href="#">
                <Icons.Discord />
              </a>
              <a href="#">
                <Icons.Twitter />
              </a>
              <a href="#">
                <Icons.Telegram />
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Text weight={700} size="lg" color="yellow">
              Tiny0x
            </Text>
            <Link href="#">About</Link>
            <Link href="#">Leaderboard</Link>
            <Link href="#">Tiny Profile</Link>
          </div>
          <div className="flex flex-col gap-4">
            <Text weight={700} size="lg" color="yellow">
              Legal
            </Text>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookie Policy</Link>
            <Link href="#">Disclaimer</Link>
          </div>
        </Container>
        <div className="opacity-10">
          <YellowBackdrop />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
