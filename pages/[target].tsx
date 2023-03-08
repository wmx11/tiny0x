import { GlassCard } from '@/components/Cards/Cards';
import ProfileCard from '@/components/Profile/ProfileCard';
import prisma from '@/prisma/prisma';
import { setClickAction, setImpressionAction } from '@/services/action';
import getDataFromIp from '@/utils/api/getDataFromIp';
import { DEFAULT_URL } from '@/utils/contstants';
import { getIpAddress } from '@/utils/utils';
import { Container } from '@mantine/core';
import { GetServerSideProps } from 'next';
import { FC } from 'react';
import UAParser from 'ua-parser-js';

type ProfilePageOrRedirectTypes = {
  userId?: string;
};

const ProfilePageOrRedirect: FC<ProfilePageOrRedirectTypes> = ({ userId }) => {
  return (
    <Container
      size="sm"
      className="py-10 flex flex-col justify-between items-center"
    >
      <GlassCard>
        <ProfileCard userId={userId} canLeaveReview />
        <div className="text-center my-10">
          <a href={DEFAULT_URL}>Powered By Tiny0x</a>
        </div>
      </GlassCard>
    </Container>
  );
};

export default ProfilePageOrRedirect;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { target } = params as { target: string };
  const userAgent = req.headers['user-agent'] || '';
  const referer = req.headers.referer || '';
  const ipAddress = getIpAddress(req);
  const device = new UAParser(userAgent).getDevice().type || 'desktop';

  if (target.startsWith('@')) {
    const profile = await prisma?.profile.findUnique({
      where: {
        username: target.substring(1),
      },
      select: {
        id: true,
        userId: true,
      },
    });

    const data = await getDataFromIp(ipAddress);
    if (data) {
      await setImpressionAction({
        ...data,
        device,
        referer,
        user_agent: userAgent,
        profileId: profile?.id,
      });
    }

    return {
      props: {
        isProfile: true,
        userId: profile?.userId,
      },
    };
  }

  const link = await prisma?.link.findUnique({
    where: {
      slug: target || '',
    },
  });

  if (link) {
    const data = await getDataFromIp(ipAddress);
    if (data) {
      await setClickAction({
        ...data,
        device,
        referer,
        user_agent: userAgent,
        linkId: link?.id,
      });
    }

    return {
      redirect: {
        destination: link?.target,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
