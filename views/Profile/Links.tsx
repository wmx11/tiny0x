import { PrimaryButton, SecondaryButton } from '@/components/Buttons/Buttons';
import Table from '@/components/Table';
import apiRoutes from '@/routes/api';
import { signedRequest } from '@/utils/api/signedRequest';
import { formatDate } from '@/utils/formatDate';
import { Button, Text, Title } from '@mantine/core';
import { Link } from '@prisma/client';
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

  return (
    <div>
      <div className="mb-8">
        <Title color="white">{title}</Title>
        {subtitle ? <Text>{subtitle}</Text> : null}
      </div>
      <Table
        isLoading={isLoading}
        style={{
          gridTemplateColumns: '50px 150px repeat(3, 1fr)',
        }}
        empty={'You currently have no links'}
        header={['No.', 'Alias', 'Target', 'Date Created', 'Action']}
        rows={
          links?.data &&
          links?.data?.data?.map((item, index) => ({
            row: [
              index + 1,
              item.slug,
              <div className="max-w-[100px] truncate">
                <a href={item.target} target="_blank">
                  {item.target}
                </a>
              </div>,
              formatDate(item.date_created),
              <>
                <SecondaryButton>Burn</SecondaryButton>
              </>,
            ],
          }))
        }
      />
    </div>
  );
};

export default Links;
