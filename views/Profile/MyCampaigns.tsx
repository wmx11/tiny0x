import { CampaignCard } from '@/components/Cards/Cards';
import apiRoutes from '@/routes/api';
import { ResultsOrError } from '@/types/Results';
import { signedRequest } from '@/utils/api/signedRequest';
import { LoadingOverlay, Text, Title } from '@mantine/core';
import { Campaign } from '@prisma/client';
import useSWR from 'swr';

const MyCampaigns = () => {
  const { data, isLoading } = useSWR<{
    data: { data: ResultsOrError<Campaign[]> };
  }>('/my-campaigns', () =>
    signedRequest({
      type: 'post',
      url: apiRoutes.profile.campaigns,
      data: {
        type: 'getCampaignsByUserId',
      },
    })
  );

  const campaigns = data?.data.data.ok ? data?.data.data.results : [];

  return (
    <div>
      <Title className="mb-4">My Campaigns</Title>
      <div className="flex flex-wrap gap-8">
        {campaigns && campaigns.length > 0 ? (
          campaigns.map((item, index) => {
            return (
              <div
                className="md:max-w-[420px] w-full"
                key={`campaign_${index}`}
              >
                <CampaignCard campaign={item} isUpdate={true} />
              </div>
            );
          })
        ) : (
          <Text>You currently have no campaigns</Text>
        )}
        <LoadingOverlay visible={isLoading} />
      </div>
    </div>
  );
};

export default MyCampaigns;
