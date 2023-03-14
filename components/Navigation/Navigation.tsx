import { navigation } from '@/utils/navigation';
import { Container, Text } from '@mantine/core';
import Link from 'next/link';
import { NavLink } from '../Links/Links';
import Logo from '../Logo';
import WalletConnect from '../WalletConnect';

const Navigation = () => {
  return (
    <>
      <header className="bg-darkPurple/50 py-4 sticky top-0 backdrop-blur-xl z-50 h-[75px]">
        <Container className="flex justify-between items-center gap-4">
          <div className="hidden md:block">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-white md:relative">
            {navigation &&
              navigation.map((item, index) => {
                return (
                  <NavLink key={`header_navigation_${index}`} href={item.href}>
                    {item.label}
                  </NavLink>
                );
              })}
          </nav>

          <div className="flex items-center justify-center w-full md:block md:w-auto">
            <WalletConnect />
          </div>
        </Container>
      </header>
      <div className="h-[75px] w-full fixed bottom-0 backdrop-blur-xl bg-darkPurple/50 z-50 flex md:hidden gap-8 items-center justify-center">
        {navigation &&
          navigation.map((item, index) => {
            return (
              <NavLink
                key={`header_bottom_navigation_${index}`}
                href={item.href}
              >
                <div className="flex flex-col items-center">
                  <item.icon />
                  <Text size="sm">
                    {item.mobileLabel ? item.mobileLabel : item.label}
                  </Text>
                </div>
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default Navigation;
