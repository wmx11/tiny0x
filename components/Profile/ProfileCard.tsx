import { Session, UserSession } from '@/pages/api/auth/[...thirdweb]';
import apiRoutes from '@/routes/api';
import generalRoutes from '@/routes/general';
import { GET_PROFILE_BY_USER } from '@/services/profile';
import { ProfileLink } from '@/types/Profile';
import { DEFAULT_URL } from '@/utils/contstants';
import Icons from '@/utils/icons';
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
    data: {
      data: Profile & { profile_links: ProfileLink[] }
    };
  }>('/profile', () =>
    axios.post(apiRoutes.profile.profile, {
      type: GET_PROFILE_BY_USER,
      userId,
    })
  );

  const profile = data?.data?.data;

  return (
    <div className="max-w-[720px] w-full">
      <ProfileHeader src={profile?.header_image_url as string} />
      <div className="translate-y-[-60px] md:ml-6 flex flex-col md:flex-row items-center md:items-end justify-between flex-wrap text-center md:text-left">
        <ProfileImage
          title={profile?.name}
          subtitle={profile?.subtitle as string}
          src={profile?.profile_image_url as string}
        />
        <div className="mt-4">
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
            You do not have a Tiny Profile. Create one to share your unique, NFT
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
                    key={`profile_link_${index}`}
                    size="lg"
                    className="hover:-translate-y-1 hover:scale-105 transition"
                    href={
                      item.linkId && item.alias
                        ? `${DEFAULT_URL}/${item.alias}`
                        : item.target
                    }
                    component="a"
                    target="__blank"
                    rightIcon={<Icons.External />}
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
