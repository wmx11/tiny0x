import { GlassCard } from '@/components/Cards/Cards';
import ProfileCard from '@/components/Profile/ProfileCard';
import prisma from '@/prisma/prisma';
import { DEFAULT_URL } from '@/utils/config';
import { Container } from '@mantine/core';
import { GetServerSideProps } from 'next';
import React from 'react';

const ProfilePageOrRedirect = () => {
  return (
    <div>
      <Container
        size="sm"
        className="py-10 flex flex-col justify-between items-center"
      >
        <GlassCard>
          <ProfileCard />
          <div className="text-center my-10">
            <a href={DEFAULT_URL}>Powered By Tiny0x</a>
          </div>
        </GlassCard>
      </Container>
    </div>
  );
};

export default ProfilePageOrRedirect;

export const getServerSideProps: GetServerSideProps<{ test: string }> = async ({
  params,
}) => {
  const { target } = params as { target: string };

  if (target.startsWith('@')) {
    return {
      props: {
        isProfile: true,
        test: 'yes',
      },
    };
  }

  const data = await prisma.link.findUnique({
    where: {
      slug: target || '',
    },
  });

  if (data) {
    return {
      redirect: {
        destination: data.target,
        permanent: false,
      },
    };
  }

  return {
    props: {
      test: 'no',
    },
  };
};
