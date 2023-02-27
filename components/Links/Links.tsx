import { Button } from '@mantine/core';
import Link from 'next/link';
import React, { FC, PropsWithChildren } from 'react';
import { PrimaryButton } from '../Buttons/Buttons';

type LinkTypes = {
  href: string;
  label?: string;
  icon?: React.ReactElement;
} & PropsWithChildren;

export const StyledLink: FC<LinkTypes> = () => {
  return <div>Links</div>;
};

export const ProfileLink: FC<LinkTypes> = ({ href, icon, children }) => {
  return (
    <Link
      href={href}
      className="p-3 bg-white/10 backdrop-blur rounded-lg flex items-center gap-4 hover:bg-white/20 hover:translate-x-2 transition shadow-lg"
    >
      {icon}
      {children}
    </Link>
  );
};
