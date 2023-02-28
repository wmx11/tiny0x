import ProfileLayout from '@/components/Layout/ProfileLayout';
import CreateOrUpdateProfile from '@/views/Profile/CreateOrUpdateProfile';
import React, { ReactElement } from 'react';

const CreateOrUpdateProfilePage = () => {
  return <CreateOrUpdateProfile />;
};

CreateOrUpdateProfilePage.getLayout = (page: ReactElement) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default CreateOrUpdateProfilePage;
