import { Text, Title } from '@mantine/core';
import { FC } from 'react';

type ProfileImageTypes = {
  src?: string;
  title?: string;
  subtitle?: string;
};

const ProfileImage: FC<ProfileImageTypes> = ({ src, title, subtitle }) => {
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
      </div>
    </div>
  );
};

export default ProfileImage;
