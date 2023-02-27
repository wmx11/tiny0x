import ProfileLayout from '@/components/Layout/ProfileLayout';
import React, { ReactElement } from 'react';

const ProfileCampaignsPage = () => {
  return <div>ProfileCampaignsPage</div>;
};

ProfileCampaignsPage.getLayout = (page: ReactElement) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default ProfileCampaignsPage;
