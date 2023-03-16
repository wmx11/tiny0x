import apiRoutes from '@/routes/api';
import {
  GET_AVERAGE_RATING_BY_PROFILE,
  LEAVE_REVIEW_FOR_PROFILE,
} from '@/services/review';
import { signedRequest } from '@/utils/api/signedRequest';
import { MAX_CHARACTERS } from '@/utils/contstants';
import {
  Modal,
  Rating,
  Skeleton,
  Stack,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUser } from '@thirdweb-dev/react';
import axios from 'axios';
import { FC, useState } from 'react';
import useSWR from 'swr';
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons';
import WalletConnect from '../WalletConnect';

type LeaveReviewTypes = {
  profileId?: string;
  name?: string;
};

const LeaveReview: FC<LeaveReviewTypes> = ({ profileId, name }) => {
  const { user, isLoggedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: averageRatingResponse,
    error,
    isLoading: isAverageRatingLoading,
  } = useSWR<{
    data: { data: number | null };
  }>('/averageRating', () =>
    axios.post(apiRoutes.profile.profile, {
      type: GET_AVERAGE_RATING_BY_PROFILE,
      profileId,
    })
  );

  const form = useForm({
    validateInputOnBlur: true,
    validate: {
      review: (value) =>
        value.length > MAX_CHARACTERS
          ? `Review cannot be longer than ${MAX_CHARACTERS} characters.`
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
        type: LEAVE_REVIEW_FOR_PROFILE,
      },
    });
    setIsLoading(false);
    setIsOpen(false);
    form.reset();
  };

  return (
    <>
      {isAverageRatingLoading ? (
        <Skeleton height={20} color="pink" className="mb-4" />
      ) : (
        <Rating
          className="mb-4"
          value={averageRatingResponse?.data?.data || 0}
          readOnly
        />
      )}

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
              <Title>Leave a review</Title>
              <Text>Connect your wallet and leave a review about {name}.</Text>
            </div>
            <div>
              <Text weight={700}>Your Rating</Text>
              <Rating
                size="lg"
                className="mb-4"
                defaultValue={0}
                {...form.getInputProps('rating', { type: 'checkbox' })}
              />
            </div>
            <div>
              <Textarea
                label="Your Review"
                description="Leave a review for this profile! Let the person know you adore them!"
                placeholder="My very awesome review about you"
                minRows={5}
                {...form.getInputProps('review')}
                sx={{
                  marginBottom: '10px',
                }}
              />
              <Text size="sm" color="dimmed">
                Characters left: {form.values.review.length}/{MAX_CHARACTERS}
              </Text>
              <Text size="xs" color="dimmed">
                Please respect others and stay civil!
              </Text>
            </div>
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
