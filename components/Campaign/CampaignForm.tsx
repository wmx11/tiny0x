import {
  SegmentedControl,
  Slider,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Campaign } from '@prisma/client';
import { FC, useState } from 'react';
import { PrimaryButton } from '../Buttons/Buttons';
import { GlassCard } from '../Cards/Cards';
import CampaignHeader from './CampaignHeader';

type CampaignFormTypes = {
  isUpdate?: boolean;
  campaign?: Campaign;
};

const CampaignForm: FC<CampaignFormTypes> = ({ isUpdate, campaign }) => {
  const [campaignImage, setCampaignImage] = useState<Blob | null>(null);

  const form = useForm({
    initialValues: {
      title: campaign?.title || '',
      description: campaign?.description || '',
      campaign_image_url: campaign?.campaign_image_url || '',
      budget: campaign?.budget ?? 0,
      duration: campaign?.duration ?? 1,
    },
  });

  return (
    <div>
      <form action="" className="flex flex-col gap-4">
        <CampaignHeader
          isUpdate={true}
          setImage={setCampaignImage}
          form={form}
          formPath="campaign_image_url"
          src={form.values.campaign_image_url || ''}
        />

        <TextInput
          label="Title"
          description="Title of your campaign. It will be used to discover your campaing on the Campaigns page."
          {...form.getInputProps('title')}
        />

        <Textarea
          label="Description"
          description="A short description about your campaign and what you are trying to achieve. This can include a brief description about your project in general."
          {...form.getInputProps('description')}
        />

        <GlassCard className="px-6 py-12">
          <div className="mb-8">
            <Text className="text-3xl">
              $
              {(
                form.values.budget * form.values.duration || 0
              ).toLocaleString()}{' '}
              over {form.values.duration}{' '}
              {form.values.duration > 1 ? 'Days' : 'Day'}
            </Text>
            <Text size="xs" color="dimmed">
              Estimated reach is approximate. Actual reach can’t be guaranteed.
            </Text>
          </div>

          <div className="mb-2">
            <Text>Daily Budget</Text>
            <Text size="xs" color="dimmed" className="mb-2">
              Your Budget
            </Text>
            <SegmentedControl
              {...form.getInputProps('budget')}
              color="grape"
              size="md"
              defaultValue="10"
              data={[
                { label: '$10', value: '10' },
                { label: '$25', value: '25' },
                { label: '$50', value: '50' },
                { label: '$100', value: '100', disabled: true },
                { label: '$250', value: '250', disabled: true },
                { label: '$500', value: '500', disabled: true },
                { label: '$1,000', value: '1000', disabled: true },
                { label: '$2,500', value: '2500', disabled: true },
                { label: '$5,000', value: '5000', disabled: true },
              ]}
            />
          </div>

          <div>
            <Text>Duration</Text>
            <Text size="xs" color="dimmed" className="mb-2">
              Your Budget
            </Text>
            <Slider
              {...form.getInputProps('duration')}
              size="lg"
              color="grape"
              min={1}
              max={30}
              step={1}
              defaultValue={1}
              marks={[
                { value: 1, label: '1 Day' },
                { value: 30, label: '30 Days' },
              ]}
            />
          </div>
        </GlassCard>

        <PrimaryButton>
          {isUpdate ? 'Update Campaign' : 'Create Campaign'}
        </PrimaryButton>
      </form>
    </div>
  );
};

export default CampaignForm;
