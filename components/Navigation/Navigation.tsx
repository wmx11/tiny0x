import generalRoutes from '@/routes/general';
import { Container } from '@mantine/core';
import Link from 'next/link';
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
          <Link href="/">Home</Link>
          <Link href={generalRoutes.about}>About</Link>
          <Link href={generalRoutes.leaderboard}>Leaderboard</Link>
          <Link href={generalRoutes.campaigns}>Campaigns</Link>
          <Link href={generalRoutes.profile}>Profile</Link>
        </nav>
        <div>
          <WalletConnect />
        </div>
      </Container>
    </header>
  );
};

export default Navigation;
