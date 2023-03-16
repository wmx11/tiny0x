import Table from '@/components/Table';
import apiRoutes from '@/routes/api';
import {
  GET_RECENT_REVIEWS_BY_PROFILE,
  GET_REVIEWS_BY_PROFILE,
} from '@/services/review';
import { signedRequest } from '@/utils/api/signedRequest';
import { formatDate } from '@/utils/formatDate';
import { truncateAddress } from '@/utils/utils';
import { Rating, Text, Title, Tooltip } from '@mantine/core';
import { Review } from '@prisma/client';
import { Column } from '@table-library/react-table-library/types/compact';
import { TableNode } from '@table-library/react-table-library/types/table';
import { FC } from 'react';
import useSWR from 'swr';

type ReviewsTypes = {
  isRecent?: boolean;
  title?: string;
  subtitle?: string;
};

const Reviews: FC<ReviewsTypes> = ({ isRecent, title, subtitle }) => {
  const { data: reviews, isLoading } = useSWR<{
    data: { data: (Review & { reviewer: { address: string } })[] };
  }>('/reviews', () =>
    signedRequest({
      type: 'post',
      url: apiRoutes.profile.reviews,
      data: {
        type: isRecent ? GET_RECENT_REVIEWS_BY_PROFILE : GET_REVIEWS_BY_PROFILE,
      },
    })
  );

  const theme = {
    Table: `--data-table-library_grid-template-columns: 250px repeat(3, 1fr);`,
    BaseCell: `
    > div {
      white-space: normal;
    }
    &:nth-of-type(1) {
      left: 0px;
      box-shadow: 2px 0px 2px rgba(0,0,0,0.1);
    }`,
  };

  const columns: Column[] = [
    {
      label: 'Review',
      pinLeft: true,
      renderCell: (item) => <>{item.review}</>,
    },
    {
      label: 'Rating',
      renderCell: (item) => (
        <>
          <Rating value={item.rating} readOnly />
        </>
      ),
    },
    {
      label: 'Reviewer',
      renderCell: (item) => (
        <>
          <Tooltip
            label={item?.reviewer?.address}
            withArrow
            color="grape"
            position="top-start"
            multiline
          >
            <Text>{truncateAddress(item?.reviewer?.address, 6)}</Text>
          </Tooltip>
        </>
      ),
    },
    {
      label: 'Date Reviewed',
      renderCell: (item) => <>{formatDate(item.date_created)}</>,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <Title color="white">{title}</Title>
        {subtitle ? <Text>{subtitle}</Text> : null}
      </div>
      <Table
        columns={columns}
        data={reviews?.data?.data as TableNode[]}
        isLoading={isLoading}
        empty={'You currently have no reviews on your profile'}
        customTheme={theme}
      />
    </div>
  );
};

export default Reviews;
