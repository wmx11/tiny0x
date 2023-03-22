import ProfileLayout from '@/components/Layout/ProfileLayout';
import ReviewsTable from '@/views/Profile/ReviewsTable';
import React, { ReactElement } from 'react';

const ProfileReviewsPage = () => {
  return <ReviewsTable title="My Profile Reviews" />;
};

ProfileReviewsPage.getLayout = (page: ReactElement) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default ProfileReviewsPage;
