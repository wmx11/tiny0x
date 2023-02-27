import ProfileLayout from '@/components/Layout/ProfileLayout';
import Reviews from '@/views/Profile/Reviews';
import React, { ReactElement } from 'react';

const ProfileReviewsPage = () => {
  return <Reviews />;
};

ProfileReviewsPage.getLayout = (page: ReactElement) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default ProfileReviewsPage;
