import Icons from '@/utils/icons';
import { footerNavigation } from '@/utils/navigation';
import { Container, Text } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { YellowBackdrop } from '../Backdrop';
import Logo from '../Logo';

const Footer = () => {
  return (
    <footer className="overflow-hidden">
      <div className="bg-darkPurple backdrop-blur-xl py-24 z-10">
        <Container className="flex flex-col md:flex-row gap-24 z-10 relative">
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
          {footerNavigation &&
            footerNavigation.map((item, index) => {
              return (
                <div className="flex flex-col gap-4">
                  <Text weight={700} size="lg" color="yellow">
                    {item.label}
                  </Text>
                  {item.items &&
                    item.items.map((_item, _index) => {
                      return <Link href={_item.href}>{_item.label}</Link>;
                    })}
                </div>
              );
            })}
        </Container>
        <div className="opacity-10">
          <YellowBackdrop />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
