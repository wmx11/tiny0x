import { ProfileLink } from '@/components/Links/Links';
import React, { FC, PropsWithChildren } from 'react';

type ProfileLayoutTypes = PropsWithChildren;

const ProfileLayout: FC<ProfileLayoutTypes> = ({ children }) => {
  return (
    <div className="grid grid-cols-[320px,1fr]">
      <div className="backdrop-blur min-h-screen p-5">
        <div className="flex flex-col gap-4">
          <ProfileLink href="/">Profile</ProfileLink>
          <ProfileLink href="#">Links</ProfileLink>
          <ProfileLink href="#">Log out</ProfileLink>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
};

export default ProfileLayout;
