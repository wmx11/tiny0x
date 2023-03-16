import { GlassCard } from '@/components/Cards/Cards';
import ProfileForm from '@/components/Profile/ProfileForm';
import { Session, UserSession } from '@/pages/api/auth/[...thirdweb]';
import apiRoutes from '@/routes/api';
import { GET_PROFILE_BY_USER } from '@/services/profile';
import { ProfileLink } from '@/types/Profile';
import { LoadingOverlay, Text, Title } from '@mantine/core';
import { Profile } from '@prisma/client';
import { useUser } from '@thirdweb-dev/react';
import axios from 'axios';
import useSWR from 'swr';

const CreateOrUpdateProfile = () => {
  const { user } = useUser<UserSession, Session>();

  const { data, error, isLoading } = useSWR<{
    data: { data: Profile & { profile_links: ProfileLink[] } };
  }>(user ? '/profile' : null, () =>
    axios.post(apiRoutes.profile.profile, {
      type: GET_PROFILE_BY_USER,
      userId: user?.session?.id,
    })
  );

  const profile = data?.data?.data;

  return (
    <div>
      <div className="max-w-[720px]">
        <div className="mb-4 text-white">
          <Title>
            {!!profile
              ? 'Update your profile'
              : 'Create your new Tiny Profile!'}
          </Title>
          {!!profile ? null : (
            <Text>
              You will mint a unique Tiny0x Profile NFT with your profile
              metadata. Think Linktree but Web3!
            </Text>
          )}
        </div>
        <GlassCard>
          {isLoading ? (
            <LoadingOverlay visible={isLoading} />
          ) : (
            <ProfileForm isUpdate={!!profile} profile={profile as Profile} />
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default CreateOrUpdateProfile;
