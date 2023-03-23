import { getCampaignByCampaignId } from '@/services/campaign';
import Campaign from '@/views/Campaign/Campaign';
import { Campaign as CampaignTypes } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

type CampaignPageTypes = {
  campaign: CampaignTypes;
};

const CampaignPage: FC<CampaignPageTypes> = ({ campaign }) => {
  return <Campaign campaign={campaign} />;
};

export default CampaignPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;

  const campaign = await getCampaignByCampaignId(id as string);

  if (!campaign.ok) {
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
