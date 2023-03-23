import apiRoutes from '@/routes/api';
import { campaignSchema } from '@/schema/campaign';
import axiosErrorHandler from '@/utils/api/axiosErrorHandler';
import { signedRequest } from '@/utils/api/signedRequest';
import config from '@/utils/config';
import { uploadImageRequest } from '@/utils/utils';
import {
  SegmentedControl,
  Slider,
  Switch,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Campaign } from '@prisma/client';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { PrimaryButton } from '../Buttons/Buttons';
import { GlassCard } from '../Cards/Cards';
import ErrorMessage from '../ErrorMessage';
import CampaignHeader from './CampaignHeader';

type CampaignFormTypes = {
  isUpdate?: boolean;
  campaign?: Campaign;
};

const CampaignForm: FC<CampaignFormTypes> = ({ isUpdate, campaign }) => {
  const [campaignImage, setCampaignImage] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const form = useForm({
    validate: zodResolver(campaignSchema),
    initialValues: {
      title: campaign?.title || '',
      description: campaign?.description || '',
      campaign_image_url: campaign?.campaign_image_url || '',
      budget: campaign?.budget?.toString() ?? 0,
      duration: campaign?.duration ?? 1,
      enabled: campaign?.enabled || false,
      isLive: campaign?.isLive || false,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const valuesCopy = { ...values };
    setLoading(true);
    setErrorMessage('');
    try {
      if (campaignImage) {
        const data = await uploadImageRequest(
          campaignImage,
          config.images.campaign.path
        );
        if (data.ok) {
          valuesCopy.campaign_image_url = data.results.url;
        }
      }

      await signedRequest({
        type: 'post',
        url: apiRoutes.campaign.createOrUpdate,
        data: { ...valuesCopy, campaignId: campaign?.id },
      });

      router.back();
    } catch (error) {
      setLoading(false);
      return axiosErrorHandler(error, (err) => {
        console.log(error);
        setErrorMessage(err);
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <CampaignHeader
          isUpdate={true}
          setImage={setCampaignImage}
          form={form}
          formPath="campaign_image_url"
          src={form.values.campaign_image_url || ''}
        />

        <ErrorMessage errorMessage={errorMessage} />

        <Switch
          color="grape"
          label="Enabled"
          description="Check this to enable or disable your campaign. This will affect visibility on all channels."
          {...form.getInputProps('enabled', { type: 'checkbox' })}
        />

        <TextInput
          label="Title"
          description="Title of your campaign. It will be used to discover your campaing on the Campaigns page."
          {...form.getInputProps('title')}
        />

        <Textarea
          label="Description"
          description="A short description about your campaign and what you are trying to achieve. This can include a brief description about your project in general."
          minRows={10}
          {...form.getInputProps('description')}
        />

        <GlassCard className="px-6 py-12">
          <div className="mb-8">
            <Text className="text-3xl">
              $
              {(
                parseInt(form.values.budget as string, 10) *
                  form.values.duration || 0
              ).toLocaleString()}{' '}
              over {form.values.duration}{' '}
              {form.values.duration > 1 ? 'Days' : 'Day'}
            </Text>
            <Text size="xs" color="dimmed">
              Estimated reach is approximate. Actual reach can’t be guaranteed.
            </Text>
          </div>

          <div className="mb-8">
            <Text className="mb-2">Daily Budget</Text>
            <SegmentedControl
              {...form.getInputProps('budget')}
              color="grape"
              size="md"
              defaultValue="10"
              fullWidth
              orientation="vertical"
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

          <div className="mb-8">
            <Text className="mb-2">Duration</Text>
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

        <PrimaryButton loading={loading} type="submit">
          {isUpdate ? 'Update Campaign' : 'Create Campaign'}
        </PrimaryButton>
      </form>
    </div>
  );
};

export default CampaignForm;
