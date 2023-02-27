import generalRoutes from '@/routes/general';
import { Rating, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons';

type ProfileImageTypes = {
  src?: string;
  title?: string;
  subtitle?: string;
};

const ProfileImage: FC<ProfileImageTypes> = ({ src, title, subtitle }) => {
  return (
    <div className="flex items-end gap-4">
      <div className="rounded-full bg-zinc-400 w-[150px] h-[150px] overflow-hidden relative border-4 border-white ">
        {src ? <img src={src} alt="Profile Image" /> : null}
      </div>
      <div className="flex justify-between items-center flex-1">
        <div>
          <Title color="white">{title}</Title>
          <Text>{subtitle}</Text>
        </div>
        <div>
          {/* <div>
            <Rating className="mb-4" value={5} />
            <SecondaryButton>Leave a review</SecondaryButton>
          </div> */}
          <Link href={generalRoutes.profile.edit} passHref>
            <PrimaryButton>Edit Profile</PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
