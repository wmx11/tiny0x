import apiRoutes from '@/routes/api';
import generalRoutes from '@/routes/general';
import { tinifySchema } from '@/schema/tinify';
import { signedRequest } from '@/utils/api/signedRequest';
import { DEFAULT_URL } from '@/utils/config';
import Icons from '@/utils/icons';
import { Checkbox, Divider, Text, TextInput, Title } from '@mantine/core';
import { zodResolver } from '@mantine/form';
import { Link as LinkSchema } from '@prisma/client';
import { useAddress, useUser } from '@thirdweb-dev/react';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { FC, useState } from 'react';
import { PrimaryButton } from '../Buttons/Buttons';
import ClipboardButton from '../ClipboardButton/ClipboardButton';
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
      isPromoted: false,
      enabled: true,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    try {
      const { data } = await signedRequest<typeof values>({
        type: 'post',
        data: values,
        url: apiRoutes.tinify,
      });

      setNewLink(data.data);
      setIsLoading(false);
      form.reset();
      form.setFieldValue('target', '');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
      <div className="flex items-center gap-2 mb-2">
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
      <TextInput
        size="md"
        className="flex-1"
        label="Your URL"
        description="This is the URL you would like to Tinify"
        placeholder="https://my-super-long-url.com/with-some-long-slug"
        {...form.getInputProps('target')}
      />
      <div>
        <div className="flex items-start gap-4 mb-4">
          <TextInput
            size="md"
            label="Domain"
            description="This is the domain name of the website"
            readOnly
            value={DEFAULT_URL}
          />
          <TextInput
            size="md"
            label="Alias"
            description="This is the unique indentifying part of the new Tiny URL"
            placeholder="tiny-alias"
            {...form.getInputProps('slug')}
          />
        </div>
      </div>

      <TextInput
        size="md"
        label="Title"
        description="Title for your link. Used for easier link management and idendification."
        placeholder="A Twitter post that I want to share"
        {...form.getInputProps('title')}
      />

      <TextInput
        size="md"
        label="Description"
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
        description="Do you allow other users or projects to display ads using your link? 80% of the ad's budget would be allocated to your account."
        {...form.getInputProps('doesAcceptAds', { type: 'checkbox' })}
      />
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
