import { OrangeBackdrop } from '@/components/Backdrop';
import { ProfileCard } from '@/components/Cards/Cards';
import { Section } from '@/components/Section';
import generalRoutes from '@/routes/general';
import { DEFAULT_URL } from '@/utils/contstants';
import { Container, Text, Title } from '@mantine/core';
import { Profile } from '@prisma/client';
import Link from 'next/link';
import React, { FC } from 'react';

type ProfilesTypes = {
  profiles: Profile[];
};

const Profiles: FC<ProfilesTypes> = ({ profiles }) => {
  return (
    <Section backdrop={<OrangeBackdrop />}>
      <Container className="py-10">
        <div className="mb-16 text-white">
          <Title className="mb-2">Discover Tiny0x profiles!</Title>
          <Text>
            Browse around the Tiny0x profile list and find other profiles you
            could connect with! Have you had previous experience with the
            person? Feel free to leave a positive review!
          </Text>
          <Text>
            {"Don't"} have your own, personal Tiny0x NFT Profile?{' '}
            <Link
              href={`${DEFAULT_URL}${generalRoutes.profile.edit}`}
              className="underline underline-offset-2"
            >
              Create one!
            </Link>
          </Text>
        </div>
        <div className="flex flex-wrap gap-4">
          {profiles &&
            profiles.length &&
            [...profiles, ...profiles].map((item, index) => (
              <div
                className="max-w-[355px] w-full"
                key={`profile_card_${index}`}
              >
                <ProfileCard profile={item} />
              </div>
            ))}
        </div>
      </Container>
    </Section>
  );
};

export default Profiles;
