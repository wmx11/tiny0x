import { Button } from '@mantine/core';
import Link from 'next/link';
import React, { FC, PropsWithChildren } from 'react';
import { PrimaryButton } from '../Buttons/Buttons';

type LinkTypes = {
  href: string;
  label?: string;
} & PropsWithChildren;

export const StyledLink: FC<LinkTypes> = () => {
  return <div>Links</div>;
};

export const ProfileLink: FC<LinkTypes> = ({ href, children }) => {
  return (
    <Link href={href} passHref>
      <PrimaryButton component="a" fullWidth size="md">
        {children}
      </PrimaryButton>
    </Link>
  );
};
