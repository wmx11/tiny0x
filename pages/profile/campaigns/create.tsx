import ProfileLayout from '@/components/Layout/ProfileLayout';
import CreateOrUpdateCampaign from '@/views/Profile/CreateOrUpdateCampaign';
import React, { ReactElement } from 'react';

const CreateCampaignPage = () => {
  return <CreateOrUpdateCampaign />;
};

CreateCampaignPage.getLayout = (page: ReactElement) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default CreateCampaignPage;
