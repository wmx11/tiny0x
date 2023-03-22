import ProfileLayout from '@/components/Layout/ProfileLayout';
import LinksTable from '@/views/Profile/LinksTable';

import { ReactElement } from 'react';

const LinksPage = () => {
  return <LinksTable title="My Links" />;
};

LinksPage.getLayout = (page: ReactElement) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default LinksPage;
