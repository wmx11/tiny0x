import ProfileLayout from '@/components/Layout/ProfileLayout';
import { getUser, UserSession } from '@/pages/api/auth/[...thirdweb]';
import { getCampaignByCampaignId } from '@/services/campaign';
import CreateOrUpdateCampaign from '@/views/Profile/CreateOrUpdateCampaign';
import { Campaign } from '@prisma/client';
import { GetServerSideProps } from 'next';
import React, { FC, ReactElement } from 'react';

type UpdateCampaignPageTypes = {
  campaign: Campaign;
};

const UpdateCampaignPage = ({ campaign }: UpdateCampaignPageTypes) => {
  return <CreateOrUpdateCampaign isUpdate={true} campaign={campaign} />;
};

UpdateCampaignPage.getLayout = (page: ReactElement) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default UpdateCampaignPage;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const id = params?.id;

  const user = (await getUser(req)) as UserSession;
  const campaign = await getCampaignByCampaignId(id as string);

  if (!campaign.ok) {
    return {
      props: {
        campaign: null,
      },
    };
  }

  if (campaign?.results?.userId !== user?.session?.id || !user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      campaign: JSON.parse(JSON.stringify(campaign.results)),
    },
  };
};
