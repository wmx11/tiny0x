import ProfileLayout from '@/components/Layout/ProfileLayout';
import Campaigns from '@/views/Profile/Campaigns';
import React, { ReactElement } from 'react';

const ProfileCampaignsPage = () => {
  return <Campaigns />;
};

ProfileCampaignsPage.getLayout = (page: ReactElement) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default ProfileCampaignsPage;
