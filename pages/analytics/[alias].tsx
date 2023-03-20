import ProfileLayout from '@/components/Layout/ProfileLayout';
import AliasStats from '@/views/Analytics/AliasStats';
import React, { ReactElement } from 'react';

const AliasStatsPage = () => {
  return <AliasStats />;
};

AliasStatsPage.getLayout = (page: ReactElement) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default AliasStatsPage;
