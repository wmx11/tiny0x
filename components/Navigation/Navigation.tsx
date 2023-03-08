import generalRoutes from '@/routes/general';
import { Container } from '@mantine/core';
import Link from 'next/link';
import { NavLink } from '../Links/Links';
import Logo from '../Logo';
import WalletConnect from '../WalletConnect';

const Navigation = () => {
  return (
    <header className="bg-darkPurple/50 py-4 sticky top-0 backdrop-blur-xl z-50">
      <Container className="flex justify-between items-center gap-4">
        <div>
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <nav className="flex items-center gap-10 text-white">
          <NavLink href="/">Home</NavLink>
          <NavLink href={generalRoutes.about}>About</NavLink>
          <NavLink href={generalRoutes.profiles}>Discover Profiles</NavLink>
        </nav>
        <div>
          <WalletConnect />
        </div>
      </Container>
    </header>
  );
};

export default Navigation;
