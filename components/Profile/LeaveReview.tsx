import apiRoutes from '@/routes/api';
import { signedRequest } from '@/utils/api/signedRequest';
import { Button, Modal, Rating, Stack, Text, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAccount, useAddress, useUser } from '@thirdweb-dev/react';
import React, { FC, useState } from 'react';
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons';
import WalletConnect from '../WalletConnect';

type LeaveReviewTypes = {
  profileId?: string;
};

const LeaveReview: FC<LeaveReviewTypes> = ({ profileId }) => {
  const { user, isLoggedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    validateInputOnBlur: true,
    validate: {
      review: (value) =>
        value.length > 250
          ? 'Review cannot be longer than 250 characters.'
          : null,
    },
    initialValues: {
      review: '',
      rating: 0,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    await signedRequest({
      type: 'post',
      url: apiRoutes.profile.reviews,
      data: {
        data: {
          ...values,
          profileId,
        },
        type: 'leaveReviewForProfile',
      },
    });
    setIsLoading(false);
    setIsOpen(false);
    form.reset();
  };

  return (
    <>
      <Rating className="mb-4" value={5} readOnly />
      <SecondaryButton onClick={() => setIsOpen(true)}>
        Leave a review
      </SecondaryButton>
      <Modal
        size="lg"
        centered
        opened={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack spacing="lg">
            <div>
              <Text weight={700}>Your Rating</Text>
              <Rating
                size="lg"
                className="mb-4"
                defaultValue={0}
                {...form.getInputProps('rating', { type: 'checkbox' })}
              />
            </div>
            <Textarea
              label="Your Review"
              description="Leave a review for this profile! Let the person know you adore them!"
              placeholder="My very awesome review about you"
              minRows={5}
              {...form.getInputProps('review')}
            />
            {user ? (
              <PrimaryButton size="md" type="submit" loading={isLoading}>
                Leave a review
              </PrimaryButton>
            ) : (
              <WalletConnect />
            )}
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default LeaveReview;
