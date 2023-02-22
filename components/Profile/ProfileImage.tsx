import { Text, Title } from '@mantine/core';
import React, { FC } from 'react';
import { PrimaryButton } from '../Buttons/Buttons';

type ProfileImageTypes = {
  src?: string;
  title?: string;
  subtitle?: string;
};

const ProfileImage: FC<ProfileImageTypes> = ({ src, title, subtitle }) => {
  return (
    <div className="flex items-end gap-4">
      <div className="rounded-full bg-red-200 w-[150px] h-[150px] overflow-hidden relative border-4 border-white ">
        <img src={src} alt="Profile Image" />
      </div>
      <div className="flex justify-between items-center flex-1">
        <div>
          <Title color="white">{title}</Title>
          <Text>{subtitle}</Text>
        </div>
        <PrimaryButton>Edit Profile</PrimaryButton>
      </div>
    </div>
  );
};

export default ProfileImage;
