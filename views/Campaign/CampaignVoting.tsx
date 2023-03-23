import { MAX_CHARACTERS } from '@/utils/contstants';
import Icons from '@/utils/icons';
import { Button, Progress, Text, Textarea, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { Campaign } from '@prisma/client';
import React from 'react';

const CampaignVoting = ({ campaign }: { campaign: Campaign }) => {
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
              { color: 'lime', value: 70, label: '70' },
              { color: 'red', value: 30, label: '30' },
            ]}
          />
        </div>
        <div className="flex justify-between gap-4">
          <Button color="lime" rightIcon={<Icons.Check />}>
            Approve
          </Button>
          <Button
            color="red"
            rightIcon={<Icons.Times />}
            onClick={() =>
              modals.openConfirmModal({
                title: <Title order={2}>Let us know your opinion</Title>,
                centered: true,
                children: (
                  <>
                    <Textarea
                      label="Your feedback"
                      description="Please provide short feedback why you are declining this campaign."
                      minRows={5}
                      maxLength={MAX_CHARACTERS}
                    />
                  </>
                ),
                labels: { confirm: 'Confirm', cancel: 'Cancel' },
                onCancel: () => console.log('Cancel'),
                onConfirm: () => console.log('Confirmed'),
              })
            }
          >
            Decline
          </Button>
        </div>
      </div>
    </>
  );
};

export default CampaignVoting;
