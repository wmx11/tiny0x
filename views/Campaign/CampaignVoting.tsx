import CampaignDecline from '@/components/Campaign/CampaignDecline';
import ErrorMessage from '@/components/ErrorMessage';
import apiRoutes from '@/routes/api';
import {
  GetVotesByCampaignIdReturnTypes,
  VoteForCampaignByIdTypes,
} from '@/services/votes';
import { ResultsOrError } from '@/types/Results';
import axiosErrorHandler from '@/utils/api/axiosErrorHandler';
import {
  signedRequest,
  SignedRequestReturnTypes,
} from '@/utils/api/signedRequest';
import { LOCAL_STORAGE_CAMPAIGN_VOTE_CHECK } from '@/utils/contstants';
import Icons from '@/utils/icons';
import { checkCanVoteAfterOneDay } from '@/utils/utils';
import { Button, Progress, Text, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { Campaign } from '@prisma/client';
import { useState } from 'react';
import useSWR from 'swr';

const CampaignVoting = ({ campaign }: { campaign: Campaign }) => {
  const [localValue, setLocalValue] = useLocalStorage<
    {
      campaignId: string;
      lastVoted: Date | null;
    }[]
  >({
    key: LOCAL_STORAGE_CAMPAIGN_VOTE_CHECK,
    defaultValue: [{ campaignId: campaign?.id, lastVoted: null }],
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { data } = useSWR<
    SignedRequestReturnTypes<ResultsOrError<GetVotesByCampaignIdReturnTypes>>
  >('/campaign-votes', () =>
    signedRequest({
      type: 'post',
      url: apiRoutes.campaign.campaigns,
      data: { type: 'getVotesByCampaignId', campaignId: campaign?.id },
    })
  );

  const votes = data?.data?.data?.ok ? data?.data?.data?.results : null;

  const handleVote = async (
    data: Omit<VoteForCampaignByIdTypes, 'campaignId' | 'userId'>
  ) => {
    setLoading(true);
    setErrorMessage('');
    try {
      await signedRequest({
        type: 'post',
        url: apiRoutes.campaign.votes,
        data: {
          campaignId: campaign?.id,
          type: 'voteForCampaignById',
          voteType: data.voteType,
          review: data?.review,
        },
      });
      setLoading(false);
      modals.closeAll();
      setLocalValue([
        ...localValue,
        { campaignId: campaign?.id, lastVoted: new Date() },
      ]);
    } catch (error) {
      console.log(error);
      setLoading(false);
      modals.closeAll();
      return axiosErrorHandler(error, (err) => {
        setErrorMessage(err);
      });
    }
  };

  const canVote = checkCanVoteAfterOneDay(
    localValue?.find((item) => item.campaignId === campaign?.id)?.lastVoted
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="mb-4">
          <Title order={3}>This campaign needs your input!</Title>
          <Text>
            Express your opinion on the following campaign! Vote {" 'Approve' "}{' '}
            or
            {" 'Decline' "} and get rewarded for your opinion. Approved
            campaigns will be launched on all Links that accept ads. Rejected
            campaigns will be manually reviewed.
          </Text>
        </div>
        <div>
          <Text align="center" weight={700} className="mb-4">
            3 days left
          </Text>
          <Progress
            size="xl"
            sections={[
              {
                color: 'lime',
                value: votes?.[1].value || 0,
                label: votes?.[1]._count.toString() || '0',
              },
              {
                color: 'red',
                value: votes?.[0].value || 0,
                label: votes?.[0]._count.toString() || '0',
              },
            ]}
          />
        </div>

        <ErrorMessage errorMessage={errorMessage} />

        {canVote ? (
          <div className="flex justify-between gap-4">
            <Button
              color="lime"
              rightIcon={<Icons.Check />}
              loading={loading}
              onClick={() => handleVote({ voteType: 1 })}
            >
              Approve
            </Button>
            <Button
              color="red"
              rightIcon={<Icons.Times />}
              loading={loading}
              onClick={() =>
                modals.open({
                  title: <Title order={2}>Let us know your opinion</Title>,
                  centered: true,
                  withinPortal: false,
                  children: (
                    <CampaignDecline
                      handler={(review) => handleVote({ voteType: 0, review })}
                    />
                  ),
                })
              }
            >
              Decline
            </Button>
          </div>
        ) : (
          <Text>Thank you for voting! You can vote again in 24 hours.</Text>
        )}
      </div>
    </>
  );
};

export default CampaignVoting;
