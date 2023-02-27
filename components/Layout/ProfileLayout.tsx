import { OrangeBackdrop } from '@/components/Backdrop';
import { ProfileLink } from '@/components/Links/Links';
import { Section } from '@/components/Section';
import generalRoutes from '@/routes/general';
import Icons from '@/utils/icons';
import React, { FC, PropsWithChildren } from 'react';

type ProfileLayoutTypes = PropsWithChildren;

const ProfileLayout: FC<ProfileLayoutTypes> = ({ children }) => {
  return (
    <Section backdrop={<OrangeBackdrop />} className="min-h-screen">
      <div className="grid grid-cols-[300px,1fr]">
        <div className="bg-gradient-to-b from-pink-600/10 to-violet-600/10 backdrop-filter backdrop-blur-lg min-h-screen p-5">
          <div className="flex flex-col gap-4">
            <ProfileLink
              href={generalRoutes.profile.profile}
              icon={<Icons.User />}
            >
              Profile
            </ProfileLink>
            <ProfileLink
              href={generalRoutes.profile.links}
              icon={<Icons.Link />}
            >
              Links
            </ProfileLink>
            <ProfileLink
              href={generalRoutes.profile.reviews}
              icon={<Icons.Review />}
            >
              Reviews
            </ProfileLink>
            <ProfileLink
              href={generalRoutes.profile.campaigns}
              icon={<Icons.Campaign />}
            >
              Campaigns
            </ProfileLink>
            <ProfileLink href={generalRoutes.profile.profile}>
              Log out
            </ProfileLink>
          </div>
        </div>
        <div className="p-10">{children}</div>
      </div>
    </Section>
  );
};

export default ProfileLayout;
