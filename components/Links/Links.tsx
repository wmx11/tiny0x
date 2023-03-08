import useIsActivePath from '@/hooks/useIsActivePath';
import Link from 'next/link';
import React, { FC, PropsWithChildren } from 'react';

type LinkTypes = {
  href: string;
  label?: string;
  icon?: React.ReactElement;
} & PropsWithChildren;

export const NavLink: FC<LinkTypes> = ({ href, icon, children }) => {
  const isActive = useIsActivePath(href);

  return (
    <Link href={href} className={`${isActive ? 'border-activeLink' : ''}`}>
      {children}
    </Link>
  );
};

export const ProfileLink: FC<LinkTypes> = ({ href, icon, children }) => {
  const isActive = useIsActivePath(href);

  return (
    <Link
      href={href}
      className={`${
        isActive ? 'border-activeLink' : ''
      } p-3 bg-white/10 backdrop-blur  rounded-lg flex items-center gap-4 hover:bg-white/20 hover:translate-x-2 transition shadow-lg`}
    >
      {icon}
      {children}
    </Link>
  );
};
