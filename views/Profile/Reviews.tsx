import Table from '@/components/Table';
import apiRoutes from '@/routes/api';
import { signedRequest } from '@/utils/api/signedRequest';
import { formatDate } from '@/utils/formatDate';
import { Rating, Text, Title } from '@mantine/core';
import { Review } from '@prisma/client';
import { FC } from 'react';
import useSWR from 'swr';

type ReviewsTypes = {
  isRecent?: boolean;
  title?: string;
  subtitle?: string;
};

const Reviews: FC<ReviewsTypes> = ({ isRecent, title, subtitle }) => {
  const { data: reviews, isLoading } = useSWR<{ data: { data: Review[] } }>(
    '/reviews',
    () =>
      signedRequest({
        type: 'post',
        url: apiRoutes.profile.reviews,
        data: {
          type: isRecent ? 'getRecentReviewsByProfile' : 'getReviewsByProfile',
        },
      })
  );
  return (
    <div>
      <div className="mb-8">
        <Title color="white">{title}</Title>
        {subtitle ? <Text>{subtitle}</Text> : null}
      </div>
      <Table
        isLoading={isLoading}
        empty={'You currently have no reviews on your profile'}
        header={['No.', 'Review', 'Rating', 'Date Reviewed']}
        rows={
          reviews?.data &&
          reviews?.data?.data?.map((item, index) => ({
            row: [
              index + 1,
              item.review,
              <Rating value={item.rating} readOnly />,
              formatDate(item.date_created),
            ],
          }))
        }
      />
    </div>
  );
};

export default Reviews;
