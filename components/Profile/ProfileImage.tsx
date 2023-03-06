import { Session, UserSession } from '@/pages/api/auth/[...thirdweb]';
import generalRoutes from '@/routes/general';
import Icons from '@/utils/icons';
import { Rating, Text, Title } from '@mantine/core';
import { useUser } from '@thirdweb-dev/react';
import Link from 'next/link';
import { FC } from 'react';
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons';

type ProfileImageTypes = {
  src?: string;
  title?: string;
  subtitle?: string;
};

const ProfileImage: FC<ProfileImageTypes> = ({ src, title, subtitle }) => {
  const { user } = useUser<UserSession, Session>();

  return (
    <div className="flex items-end gap-4">
      <div className="rounded-full bg-zinc-400 w-[150px] h-[150px] overflow-hidden relative border-4 border-white">
        {/* <div className="absolute bg-zinc-200/20 flex items-center justify-center gap-4 inset-0">
          <Icons.Camera className="text-2xl" />
          <Icons.Trash className="text-2xl" />
        </div> */}
        {src ? <img src={src} alt="Profile Image" /> : null}
      </div>
      <div className="flex justify-between items-center flex-1">
        <div>
          <Title color="white">{title}</Title>
          <Text>{subtitle}</Text>
        </div>
        <div>
          {user?.session?.profileId ? (
            <Link href={generalRoutes.profile.edit} passHref>
              <PrimaryButton>Edit Profile</PrimaryButton>
            </Link>
          ) : (
            <div>
              <Rating className="mb-4" value={5} />
              <SecondaryButton>Leave a review</SecondaryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
