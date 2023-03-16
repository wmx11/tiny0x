import { DEFAULT_URL } from '@/utils/contstants';
import { formatDate } from '@/utils/formatDate';
import Icons from '@/utils/icons';
import { Code, Loader, Spoiler, Text, Title } from '@mantine/core';
import { Profile } from '@prisma/client';
import { FC, PropsWithChildren } from 'react';
import { SecondaryButton } from '../Buttons/Buttons';
import ProfileImage from '../Profile/ProfileImage';

type NFTCardTypes = {
  code?: string;
  image?: string;
};

export const NFTCard: FC<NFTCardTypes> = ({ code, image }) => {
  return (
    <div className="bg-gradient-to-br from-pink-500/50 to-purple-500/50 backdrop-filter backdrop-blur-xl rounded-xl w-[350px] p-4 shadow-md">
      <div className="h-[250px] rounded-xl bg-gradient-to-br from-white/20 to-purple-500/50 mb-4 overflow-hidden shadow-md">
        <img
          src="https://i.seadn.io/gae/HZuqeRrZpjxe_MQkHLWTPHeGaKGsz7DK7hjih4QyvhqrA3Oy4hebmlAn6-rsPintCfB6z3hn7AMq5y5rPDYsaOcqogSDe3u9nJ2Vcw?auto=format&w=350"
          alt="blob"
          className="object-fill"
        />
      </div>
      {code ? (
        <Code block className="shadow-md">
          {code}
        </Code>
      ) : null}
    </div>
  );
};

export const GlassCard: FC<PropsWithChildren & { className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`bg-white/10 backdrop-filter backdrop-blur-lg rounded-xl px-4 py-7 shadow-md ${className}`}
    >
      {children}
    </div>
  );
};

export const StatCard: FC<
  PropsWithChildren & { value?: string | number; label?: string }
> = ({ value, label, children }) => {
  return (
    <GlassCard className="md:max-w-[300px] w-full text-center hover:shadow-xl transition flex flex-col justify-center items-center">
      <div className="w-full">
        <Title className="text-5xl mb-2 flex items-center justify-center">
          {value ?? <Loader />}
        </Title>
        <Text>{label}</Text>
        {children ? children : null}
      </div>
    </GlassCard>
  );
};

export const ProfileCard: FC<{ profile: Profile }> = ({ profile }) => {
  return (
    <GlassCard className="flex flex-col justify-between gap-4">
      <div className="mb-4">
        <ProfileImage
          title={profile?.name || ''}
          subtitle={profile?.subtitle || ''}
          src={profile?.profile_image_url || ''}
          newLine
        />
        <Text size="sm" color="dimmed" className="mt-4">
          Joined: {formatDate(profile?.date_created)}
        </Text>
      </div>
      <Spoiler
        maxHeight={100}
        hideLabel="Hide"
        showLabel="Show More"
        className="min-h-[130px]"
      >
        <Text weight={700}>Description</Text>
        <Text>
          {profile.description
            ? profile.description
            : 'This profile has no description.'}
        </Text>
      </Spoiler>
      <SecondaryButton
        rightIcon={<Icons.External />}
        size="md"
        component="a"
        href={`${DEFAULT_URL}/@${profile?.username}`}
        target="__blank"
      >
        View Profile
      </SecondaryButton>
    </GlassCard>
  );
};
