import ProfileLayout from '@/components/Layout/ProfileLayout';
import CreateOrUpdateCampaign from '@/views/Profile/CreateOrUpdateCampaign';
import React, { ReactElement } from 'react';

const UpdateCampaignPage = () => {
  return <CreateOrUpdateCampaign isUpdate={true} />;
};

UpdateCampaignPage.getLayout = (page: ReactElement) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default UpdateCampaignPage;
