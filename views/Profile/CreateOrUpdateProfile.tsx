import { GlassCard } from '@/components/Cards/Cards';
import ProfileForm from '@/components/Profile/ProfileForm';
import { Session, UserSession } from '@/pages/api/auth/[...thirdweb]';
import { requestProfileByUser } from '@/services/profile';
import { LoadingOverlay, Text, Title } from '@mantine/core';
import { Profile } from '@prisma/client';
import { useUser } from '@thirdweb-dev/react';
import useSWR from 'swr';
import axios from 'axios';
import apiRoutes from '@/routes/api';
import { ProfileLink } from '@/types/Profile';

const CreateOrUpdateProfile = () => {
  const { user } = useUser<UserSession, Session>();

  const { data, error, isLoading } = useSWR<{
    data: { data: Profile & { profile_links: ProfileLink[] } };
  }>(user ? '/profile' : null, () =>
    axios.post(apiRoutes.profile.profile, {
      type: 'getProfileByUser',
      userId: user?.session?.id,
    })
  );

  const profile = data?.data?.data;

  return (
    <div className="max-w-[720px]">
      <div className="mb-4 text-white">
        <Title>Create your new Tiny Profile!</Title>
        <Text>
          You will mint a unique Tiny0x Profile NFT with your profile metadata.
          Think Linktree but Web3!
        </Text>
      </div>
      <GlassCard>
        {isLoading ? (
          <LoadingOverlay visible={isLoading} />
        ) : (
          <ProfileForm isUpdate={!!profile} profile={profile as Profile} />
        )}
      </GlassCard>
    </div>
  );
};

export default CreateOrUpdateProfile;
