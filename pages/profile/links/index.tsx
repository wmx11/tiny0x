import ProfileLayout from '@/components/Layout/ProfileLayout';
import Links from '@/views/Profile/Links';
import React, { ReactElement } from 'react';

const LinksPage = () => {
  return <Links />;
};

LinksPage.getLayout = (page: ReactElement) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default LinksPage;
