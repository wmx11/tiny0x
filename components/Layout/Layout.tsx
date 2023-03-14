import { FC, PropsWithChildren } from 'react';
import Footer from '../Footer';
import Header from '../Header';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen relative">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
