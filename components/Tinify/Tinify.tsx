import Icons from '@/utils/icons';
import { Divider, Text, TextInput, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { SecondaryButton } from '../Buttons/Buttons';
import TinifyForm from './TinifyForm';
import { useTinifyForm } from './tinifyFormContext';

const Tinify = () => {
  const form = useTinifyForm();

  return (
    <>
      <div className="flex flex-col md:flex-row flex-wrap md:items-start gap-2 w-full mb-2">
        <TextInput
          size="lg"
          className="flex-1"
          placeholder="https://my-super-long-url.com/with-some-long-slug"
          {...form.getInputProps('target')}
        />
        <SecondaryButton
          size="lg"
          rightIcon={<Icons.ArrowRight />}
          onClick={() =>
            modals.open({
              title: (
                <Title color="white" className="mb-4">
                  Convert URL to Tiny NFT
                </Title>
              ),
              withinPortal: false,
              centered: true,
              size: 'lg',
              overlayBlur: 10,
              children: (
                <>
                  <Text size="sm">
                    Turn your long-form or other type of URLs into easily
                    shareable links with NFTs. Each tinified link mints a unique
                    Tiny NFT which proves your ownership of the newly generated
                    link. You can use these NFTs to accept ads from other NFT
                    holders and get a % of the total budget.
                  </Text>
                  <Divider my="lg" />
                  <TinifyForm target={form.values.target} />
                </>
              ),
            })
          }
        >
          Tinify
        </SecondaryButton>
      </div>
      <Text size="sm" color="dimmed">
        By clicking TINIFY, you are agreeing to Tiny0x Terms of Service, Privacy
        Policy
      </Text>
    </>
  );
};

export default Tinify;
