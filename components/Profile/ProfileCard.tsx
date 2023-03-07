import { Session, UserSession } from '@/pages/api/auth/[...thirdweb]';
import apiRoutes from '@/routes/api';
import generalRoutes from '@/routes/general';
import { ProfileLink } from '@/types/Profile';
import { Text } from '@mantine/core';
import { Profile } from '@prisma/client';
import { useUser } from '@thirdweb-dev/react';
import axios from 'axios';
import Link from 'next/link';
import { FC } from 'react';
import useSWR from 'swr';
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons';
import LeaveReview from './LeaveReview';
import ProfileHeader from './ProfileHeader';
import ProfileImage from './ProfileImage';

type ProfileCardTypes = {
  userId?: string;
  canLeaveReview?: boolean;
};

const ProfileCard: FC<ProfileCardTypes> = ({ userId, canLeaveReview }) => {
  const { user } = useUser<UserSession, Session>();

  const { data, error, isLoading } = useSWR<{
    data: { data: Profile & { profile_links: ProfileLink[] } };
  }>('/profile', () =>
    axios.post(apiRoutes.profile.profile, {
      type: 'getProfileByUser',
      userId,
    })
  );

  const profile = data?.data?.data;

  return (
    <div className="max-w-[720px] w-[100%]">
      <ProfileHeader />
      <div className="translate-y-[-60px] ml-6 flex items-end justify-between">
        <ProfileImage
          title={profile?.name}
          subtitle={profile?.subtitle as string}
        />
        <div>
          {user && user?.session?.profileId === profile?.id ? (
            <Link href={generalRoutes.profile.edit} passHref>
              <PrimaryButton>Edit Profile</PrimaryButton>
            </Link>
          ) : canLeaveReview ? (
            <div>
              <LeaveReview profileId={profile?.id} name={profile?.name} />
            </div>
          ) : null}
        </div>
      </div>
      {user && !canLeaveReview && !user?.session?.profileId ? (
        <div className="flex flex-col items-center gap-4">
          <Text>
            You don't have a Tiny Profile. Create one to share your unique, NFT
            based profile with everyone!
          </Text>
          <Link href={generalRoutes.profile.edit} passHref>
            <PrimaryButton size="lg">Create Profile</PrimaryButton>
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-8">{profile?.description}</div>
          <div className="flex flex-col gap-4">
            {profile?.profile_links &&
              profile?.profile_links?.map((item, index) => {
                return (
                  <SecondaryButton
                    size="lg"
                    className="hover:-translate-y-1 hover:scale-105 transition"
                    href={item.target}
                    component="a"
                  >
                    {item.label}
                  </SecondaryButton>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileCard;
