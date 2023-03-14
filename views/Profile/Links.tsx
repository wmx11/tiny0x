import { SecondaryButton } from '@/components/Buttons/Buttons';
import Table from '@/components/Table';
import apiRoutes from '@/routes/api';
import { signedRequest } from '@/utils/api/signedRequest';
import { formatDate } from '@/utils/formatDate';
import { Text, Title } from '@mantine/core';
import { Link } from '@prisma/client';
import { Column } from '@table-library/react-table-library/types/compact';
import { TableNode } from '@table-library/react-table-library/types/table';
import { FC } from 'react';
import useSWR from 'swr';

type LinksTypes = {
  isRecent?: boolean;
  title?: string;
  subtitle?: string;
};

const Links: FC<LinksTypes> = ({ isRecent, title, subtitle }) => {
  const { data: links, isLoading } = useSWR<{ data: { data: Link[] } }>(
    '/links',
    () =>
      signedRequest({
        type: 'post',
        url: apiRoutes.profile.links,
        data: {
          type: isRecent ? 'getRecentLinksByUser' : 'getLinksByUser',
        },
      })
  );

  const theme = {
    Table: `--data-table-library_grid-template-columns: 150px repeat(3, 1fr);`,
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
      label: 'Alias',
      pinLeft: true,
      renderCell: (item) => <>{item.slug}</>,
    },
    {
      label: 'Target',
      renderCell: (item) => (
        <>
          <div className="break-all">
            <a href={item.target as string} target="_blank" rel="noreferrer">
              {item.target}
            </a>
          </div>
        </>
      ),
    },
    {
      label: 'Date Created',
      renderCell: (item) => <>{formatDate(item.date_created)}</>,
    },
    {
      label: 'Action',
      renderCell: (item) => (
        <>
          {' '}
          <SecondaryButton>Burn</SecondaryButton>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <Title color="white">{title}</Title>
        {subtitle ? <Text>{subtitle}</Text> : null}
      </div>
      <Table
        customTheme={theme}
        columns={columns}
        data={links?.data?.data as TableNode[]}
        isLoading={isLoading}
        empty={'You currently have no links'}
      />
    </div>
  );
};

export default Links;
