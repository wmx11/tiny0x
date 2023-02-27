import React, { FC, PropsWithChildren } from 'react';
import { OrangeBackdrop } from '../Backdrop';
import Footer from '../Footer';
import Header from '../Header';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="">
      <Header />
      <main className="min-h-screen relative">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
