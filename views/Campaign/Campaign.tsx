import { Section } from '@/components/Section';
import { MAX_CHARACTERS } from '@/utils/contstants';
import Icons from '@/utils/icons';
import {
  Badge,
  Button,
  Container,
  Progress,
  Text,
  Textarea, Title
} from '@mantine/core';
import { modals } from '@mantine/modals';

const Campaign = () => {
  return (
    <Section>
      <Container className="py-10">
        <div className="mb-8 h-[256px] bg-red-200 rounded-md w-full"></div>
        <div className="mb-16">
          <div className="flex gap-4">
            <Title>Campaign Title</Title>
            <Badge variant="filled" color="red">
              Pending
            </Badge>
          </div>
          <Text>Project Name</Text>
        </div>

        <div className="mb-8">
          <Text weight={700} className="mb-4">
            About the campaign
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </Text>
        </div>

        <div className="flex flex-col gap-4">
          <div className="mb-8">
            <Title order={3}>Voting</Title>
            <Text>
              Express your opinion on the following campaign! Vote "Approve" or
              "Decline" and get rewarded for your opinion. Approved campaigns
              will be launched on all Links that accept ads. Rejected campaigns
              will be manually reviewed.
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
      </Container>
    </Section>
  );
};

export default Campaign;
