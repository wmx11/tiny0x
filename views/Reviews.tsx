import { OrangeBackdrop } from '@/components/Backdrop';
import { Section } from '@/components/Section';
import { Container } from '@mantine/core';
import { Review } from '@prisma/client';
import React, { FC } from 'react';
import ReviewsTable from './Profile/ReviewsTable';

type ReviewsTypes = {
  reviews: (Review & { profile: { name: string } })[];
};

const Reviews: FC<ReviewsTypes> = ({ reviews }) => {
  return (
    <Section backdrop={<OrangeBackdrop />} className="min-h-screen">
      <Container className="py-10">
        <ReviewsTable
          data={reviews}
          title={`Reviews about ${reviews[0]?.profile?.name || '...'}`}
        />
      </Container>
    </Section>
  );
};

export default Reviews;
