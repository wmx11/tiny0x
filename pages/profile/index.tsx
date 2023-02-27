import ProfileLayout from '@/components/Layout/ProfileLayout';
import Profile from '@/views/Profile/Profile';
import React, { ReactElement } from 'react';

const ProfilePage = () => {
  return <Profile />;
};

ProfilePage.getLayout = (page: ReactElement) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default ProfilePage;
