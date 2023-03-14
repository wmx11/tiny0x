import { OrangeBackdrop } from '@/components/Backdrop';
import { ProfileLink } from '@/components/Links/Links';
import { Section } from '@/components/Section';
import { profileNavigation } from '@/utils/navigation';
import { Text } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';

type ProfileLayoutTypes = PropsWithChildren;

const asideStyles =
  'bg-gradient-to-b from-pink-600/10 to-violet-600/10 backdrop-filter backdrop-blur-lg min-h-screen transition-all z-50 w-full hidden md:p-5 md:max-w-[280px] md:relative md:top-0 md:block';

const ProfileLayout: FC<ProfileLayoutTypes> = ({ children }) => {
  return (
    <Section backdrop={<OrangeBackdrop />} className="min-h-screen">
      <div className="flex">
        <div className={`${asideStyles}`}>
          <div className="flex flex-col gap-4">
            {profileNavigation &&
              profileNavigation.map((item, index) => {
                return (
                  <ProfileLink
                    key={`profile_navigation_${index}`}
                    href={item.href}
                    icon={<item.icon />}
                  >
                    <Text>{item.label}</Text>
                  </ProfileLink>
                );
              })}
          </div>
        </div>
        <div className="p-5 md:p-10 flex-grow">{children}</div>
      </div>
    </Section>
  );
};

export default ProfileLayout;
