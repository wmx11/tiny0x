import React, { FC, PropsWithChildren } from 'react';
import Footer from '../Footer';
import Header from '../Header';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative z-10">
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
