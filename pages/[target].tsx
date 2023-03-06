import { GlassCard } from '@/components/Cards/Cards';
import ProfileCard from '@/components/Profile/ProfileCard';
import prisma from '@/prisma/prisma';
import { DEFAULT_URL } from '@/utils/config';
import { Container } from '@mantine/core';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const ProfilePageOrRedirect = () => {
  const router = useRouter();
  return (
    <div className="relative">
      {/* <iframe
        src="https://swych.finance"
        width="100%"
        height="100vh"
        style={{
          height: '100vh',
        }}
      />
      <div className="fixed bottom-0 w-full p-10 bg-red-200"></div> */}

      {/* <Container
        size="sm"
        className="py-10 flex flex-col justify-between items-center"
      >
        <GlassCard>
          <ProfileCard />
          <div className="text-center my-10">
            <a href={DEFAULT_URL}>Powered By Tiny0x</a>
          </div>
        </GlassCard>
      </Container> */}
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

  const data = await prisma?.link.findUnique({
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
