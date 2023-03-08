import { getProfiles } from '@/services/profile';
import Profiles from '@/views/Profiles';
import { Profile } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

type ProfilesPageTypes = {
  profiles: Profile[];
};

const ProfilesPage: FC<ProfilesPageTypes> = ({ profiles }) => {
  return <Profiles profiles={profiles} />;
};

export default ProfilesPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const profiles = await getProfiles();

  return {
    props: {
      profiles: JSON.parse(JSON.stringify(profiles)),
    },
  };
};
