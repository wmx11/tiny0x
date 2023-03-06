import ProfileLayout from '@/components/Layout/ProfileLayout';
import Table from '@/components/Table';
import { getUser, UserSession } from '@/pages/api/auth/[...thirdweb]';
import prisma from '@/prisma/prisma';
import Links from '@/views/Profile/Links';
import { Button } from '@mantine/core';
import { Link } from '@prisma/client';
import { GetServerSideProps } from 'next';
import React, { FC, ReactElement, ReactNode } from 'react';

type LinksPageTypes = {
  links?: Link[];
};

const LinksPage = ({ links }: LinksPageTypes) => {
  return (
    <Table
      header={['#ID', 'Alias', 'Target', 'Title', 'Description', 'Action']}
      rows={links?.map((item) => ({
        row: [
          item.id,
          item.slug,
          item.target,
          item.title,
          item.description,
          <>
            <Button>Burn</Button>
          </>,
        ],
      }))}
    />
  );
  return <Links />;
};

LinksPage.getLayout = (page: ReactElement) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default LinksPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = (await getUser(req)) as UserSession;

  const links = await prisma?.link.findMany({
    where: {
      userId: user?.session?.id,
    },
  });

  console.log(links);

  return {
    props: {
      links: links ? JSON.parse(JSON.stringify(links)) : null,
    },
  };
};
