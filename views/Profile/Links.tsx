import { SecondaryButton } from '@/components/Buttons/Buttons';
import Table from '@/components/Table';
import apiRoutes from '@/routes/api';
import generalRoutes from '@/routes/general';
import { GET_LINKS_BY_USER, GET_RECENT_LINKS_BY_USER } from '@/services/link';
import { signedRequest } from '@/utils/api/signedRequest';
import { DEFAULT_URL } from '@/utils/contstants';
import { formatDate } from '@/utils/formatDate';
import Icons from '@/utils/icons';
import { Text, Title } from '@mantine/core';
import { Link as LinkSchema } from '@prisma/client';
import { Column } from '@table-library/react-table-library/types/compact';
import { TableNode } from '@table-library/react-table-library/types/table';
import Link from 'next/link';
import { FC } from 'react';
import useSWR from 'swr';

type LinksTypes = {
  isRecent?: boolean;
  title?: string;
  subtitle?: string;
};

const Links: FC<LinksTypes> = ({ isRecent, title, subtitle }) => {
  const { data: links, isLoading } = useSWR<{ data: { data: LinkSchema[] } }>(
    '/links',
    () =>
      signedRequest({
        type: 'post',
        url: apiRoutes.profile.links,
        data: {
          type: isRecent ? GET_RECENT_LINKS_BY_USER : GET_LINKS_BY_USER,
        },
      })
  );

  const theme = {
    Table: `--data-table-library_grid-template-columns: 130px repeat(6, 1fr);`,
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
      renderCell: (item) => (
        <>
          {item?.trackMetrics ? (
            <Link
              href={`${generalRoutes.analytics.alias.replace(
                '${alias}',
                item.slug
              )}`}
              className="flex items-center gap-2"
            >
              <Icons.Analytics />
              {item.slug}
            </Link>
          ) : (
            item.slug
          )}
        </>
      ),
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
      label: 'Track Metrics',
      renderCell: (item) => (
        <>
          {item?.trackMetrics ? (
            <Icons.Check className="text-green-500" />
          ) : (
            <Icons.Times className="text-red-500" />
          )}
        </>
      ),
    },
    {
      label: 'Accepting Ads',
      renderCell: (item) => (
        <>
          {item?.doesAcceptAds ? (
            <Icons.Check className="text-green-500" />
          ) : (
            <Icons.Times className="text-red-500" />
          )}
        </>
      ),
    },
    {
      label: 'Clicks',
      renderCell: (item) => (
        <>{item?.trackMetrics ? item?._count?.actions || 0 : '...'}</>
      ),
    },
    {
      label: 'Date Created',
      renderCell: (item) => <>{formatDate(item.date_created)}</>,
    },
    {
      label: 'Action',
      renderCell: (item) => (
        <div className="flex gap-2">
          <SecondaryButton
            size="xs"
            rightIcon={<Icons.External />}
            component="a"
            href={`${DEFAULT_URL}/${item?.slug}`}
            target="__blank"
          >
            Visit
          </SecondaryButton>
          <SecondaryButton size="xs">Burn</SecondaryButton>
        </div>
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
