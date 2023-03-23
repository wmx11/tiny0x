import apiRoutes from '@/routes/api';
import generalRoutes from '@/routes/general';
import { tinifySchema } from '@/schema/tinify';
import { GET_TOTAL_LINKS_COUNT_FOR_THIS_MONTH_BY_USER_IP } from '@/services/link';
import axiosErrorHandler from '@/utils/api/axiosErrorHandler';
import { signedRequest } from '@/utils/api/signedRequest';
import config, { LinkPriceEntries } from '@/utils/config';
import { DEFAULT_URL } from '@/utils/contstants';
import Icons from '@/utils/icons';
import { Checkbox, Divider, Text, TextInput, Title } from '@mantine/core';
import { zodResolver } from '@mantine/form';
import { Link as LinkSchema } from '@prisma/client';
import { useAddress, useUser } from '@thirdweb-dev/react';
import Link from 'next/link';
import { FC, useState } from 'react';
import slugify from 'slugify';
import useSWR from 'swr';
import { PrimaryButton } from '../Buttons/Buttons';
import { NFTCard } from '../Cards/Cards';
import ClipboardButton from '../ClipboardButton/ClipboardButton';
import ErrorMessage from '../ErrorMessage';
import WalletConnect from '../WalletConnect';
import { useTinifyForm } from './tinifyFormContext';

type TinifyFormTypes = {
  target?: string;
};

const TinifyForm: FC<TinifyFormTypes> = ({ target }) => {
  const address = useAddress();
  const { isLoggedIn } = useUser();
  const [newLink, setNewLink] = useState<LinkSchema>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { data: linksForThisMonthResponse } = useSWR<{
    data: { data: number };
  }>(address && isLoggedIn ? '/links_for_this_month' : null, () =>
    signedRequest({
      type: 'post',
      url: apiRoutes.profile.links,
      data: {
        type: GET_TOTAL_LINKS_COUNT_FOR_THIS_MONTH_BY_USER_IP,
      },
    })
  );

  const linksForThisMonth = linksForThisMonthResponse?.data?.data || 0;

  const form = useTinifyForm({
    validate: zodResolver(tinifySchema),
    validateInputOnBlur: true,
    initialValues: {
      slug: '',
      target: target || '',
      title: '',
      description: '',
      doesAcceptAds: false,
      trackMetrics: false,
      enabled: true,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    setError('');
    try {
      const { data } = await signedRequest<typeof values>({
        type: 'post',
        data: values,
        url: apiRoutes.tinify,
      });
      setNewLink(data.data as LinkSchema);
      setIsLoading(false);
      form.reset();
      form.setFieldValue('target', '');
      if (data?.errorMessage) {
        setError(data.errorMessage);
      }
    } catch (error) {
      axiosErrorHandler(error, (error) => {
        console.log(error);
        setIsLoading(false);
        setError(error as string);
      });
    }
  };

  return newLink ? (
    <div className="flex flex-col gap-4">
      <Title order={2} color="white">
        Your Tiny URL & NFT
      </Title>
      <Text>
        You can view all of your previously Tinified links and NFTs on your{' '}
        <Link
          href={generalRoutes.profile.profile}
          className="underline underline-offset-2 text-pink-500"
        >
          Profile
        </Link>{' '}
        page
      </Text>
      <div className="flex items-center justify-center">
        <NFTCard
          code={JSON.stringify(
            (() => {
              const code = {};
              Object.keys(form.values).forEach((key) =>
                Object.assign(code, {
                  [key]: newLink[key as keyof LinkSchema],
                })
              );
              return code;
            })(),
            null,
            2
          )}
        />
      </div>
      <div className="flex items-center justify-center gap-2 mb-2">
        <a
          href={`${DEFAULT_URL}/${newLink.slug}`}
          target="__blank"
          className="text-xl text-white underline underline-offset-2"
        >{`${DEFAULT_URL}/${newLink.slug}`}</a>
        <ClipboardButton copy={`${DEFAULT_URL}/${newLink.slug}`} />
      </div>
      <PrimaryButton
        size="md"
        type="submit"
        onClick={() => setNewLink(undefined)}
        rightIcon={<Icons.ArrowRight />}
      >
        Tinify more URLs
      </PrimaryButton>
    </div>
  ) : (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-col gap-4 py-10"
    >
      {error ? <ErrorMessage errorMessage={error} /> : null}
      <TextInput
        size="md"
        className="flex-1"
        label="Your URL"
        description="This is the URL you would like to Tinify"
        placeholder="https://my-super-long-url.com/with-some-long-slug"
        required
        withAsterisk
        {...form.getInputProps('target')}
      />
      <div>
        <div className="flex items-center gap-4 mb-4">
          <TextInput
            size="md"
            label="Domain"
            description="This is the domain name of the website"
            readOnly
            value={DEFAULT_URL}
          />
          <TextInput
            size="md"
            label="Alias (Optional)"
            description="This is the unique indentifying part of the new Tiny URL."
            placeholder="tiny-alias"
            {...form.getInputProps('slug')}
            onBlur={(e) =>
              form.setFieldValue(
                'slug',
                slugify(e.currentTarget.value, { lower: true })
              )
            }
          />
        </div>
      </div>

      <TextInput
        size="md"
        label="Title (Optional)"
        description="Title for your link. Used for easier link management and idendification."
        placeholder="A Twitter post that I want to share"
        {...form.getInputProps('title')}
      />

      <TextInput
        size="md"
        label="Description (Optional)"
        description="Description for your link. Used for easier link management and idendification."
        placeholder="We are tracking clicks to this Twitter post"
        {...form.getInputProps('description')}
      />

      <Title color="white" order={2} className="mb-2">
        Options
      </Title>
      <Divider />
      <Checkbox
        size="md"
        label="Track Clicks and Traffic"
        description="Do you want to track the click through rate going to the new Tiny link?"
        {...form.getInputProps('trackMetrics', { type: 'checkbox' })}
      />
      <Checkbox
        size="md"
        label="Accept Advertising"
        description="Do you allow other users display ads on your link? This would allow you to redeem rewards for ad impressions and clicks."
        {...form.getInputProps('doesAcceptAds', { type: 'checkbox' })}
      />
      <div className="text-center">
        <Text>
          You can mint <strong>{config.links.freePerIp}</strong> simple Link
          NFTs for free every month.
        </Text>
        <Text>
          You have minted a total of <strong>{linksForThisMonth || 0}</strong>{' '}
          Link NFTs this month.
        </Text>
        <Text underline>
          You have{' '}
          <strong>
            {Math.max(0, config.links.freePerIp - linksForThisMonth)}
          </strong>{' '}
          free Link NFTs left.
        </Text>
      </div>
      <div>
        <Text align="center" weight={700} className="text-2xl mb-4">
          Total cost of your Link NFT: $
          {config.links.prices.calculatePrice(
            form.values as unknown as LinkPriceEntries,
            linksForThisMonth || 0
          )}
        </Text>
      </div>
      {address && isLoggedIn ? (
        <PrimaryButton
          size="md"
          type="submit"
          loading={isLoading}
          rightIcon={<Icons.ArrowRight />}
        >
          Tinify
        </PrimaryButton>
      ) : (
        <WalletConnect />
      )}
    </form>
  );
};

export default TinifyForm;
