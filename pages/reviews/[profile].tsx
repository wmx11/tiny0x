import { getReviewsByProfile } from '@/services/review';
import Reviews from '@/views/Reviews';
import { Review } from '@prisma/client';
import { GetServerSideProps } from 'next';
import React, { FC } from 'react';

type ReviewsPageTypes = {
  reviews: (Review & { Profile: { name: string } })[];
};

const ReviewsPage: FC<ReviewsPageTypes> = ({ reviews }) => {
  return <Reviews reviews={reviews} />;
};

export default ReviewsPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const profile = params?.profile;

  if (!profile) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const data = await getReviewsByProfile(profile as string);

  return {
    props: {
      reviews: JSON.parse(JSON.stringify(data)),
    },
  };
};
