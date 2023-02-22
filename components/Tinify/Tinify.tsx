import Icons from '@/utils/icons';
import { Divider, Modal, Text, TextInput, Title } from '@mantine/core';
import { useState } from 'react';
import { SecondaryButton } from '../Buttons/Buttons';
import TinifyForm from './TinifyForm';
import { useTinifyForm } from './tinifyFormContext';

const Tinify = () => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useTinifyForm();

  return (
    <>
      <div className="flex items-start gap-2 w-full mb-2">
        <TextInput
          size="lg"
          className="flex-1"
          placeholder="https://my-super-long-url.com/with-some-long-slug"
          {...form.getInputProps('target')}
        />
        <SecondaryButton
          size="lg"
          rightIcon={<Icons.ArrowRight />}
          onClick={() => setIsOpen(true)}
        >
          Tinify
        </SecondaryButton>
      </div>
      <Text size="sm" color="dimmed">
        By clicking TINIFY, you are agreeing to Tiny0x Terms of Service, Privacy
        Policy
      </Text>
      <Modal
        centered
        opened={isOpen}
        overlayBlur={10}
        onClose={() => setIsOpen(false)}
        withinPortal={false}
        size="lg"
        title={
          <Title color="white" className="mb-4">
            Convert URL to Tiny NFT
          </Title>
        }
      >
        <Text size="sm">
          Turn your long-form or other type of URLs into easily shareable links
          with NFTs. Each tinified link mints a unique Tiny NFT which proves
          your ownership of the newly generated link. You can use these NFTs to
          accept ads from other NFT holders and get a % of the total budget.
        </Text>

        <Divider my="lg" />

        <TinifyForm target={form.values.target} />
      </Modal>
    </>
  );
};

export default Tinify;
