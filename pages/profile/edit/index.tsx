import ProfileLayout from '@/components/Layout/ProfileLayout';
import CreateOrEditProfile from '@/views/Profile/CreateOrEditProfile';
import React, { ReactElement } from 'react';

const CreateOrEditProfilePage = () => {
  return <CreateOrEditProfile />;
};

CreateOrEditProfilePage.getLayout = (page: ReactElement) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default CreateOrEditProfilePage;
