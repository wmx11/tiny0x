import { SetImage } from '@/types/Files';
import { Text, Title } from '@mantine/core';
import { FC } from 'react';
import ImageUpload from '../ImageUpload';

type ProfileImageTypes = {
  src?: string;
  title?: string;
  subtitle?: string;
  newLine?: boolean;
  isUpdate?: boolean;
} & SetImage;

const ProfileImage: FC<ProfileImageTypes> = ({
  src,
  title,
  subtitle,
  newLine,
  isUpdate,
  setImage,
}) => {
  return (
    <div
      className={`flex flex-col items-center gap-4 flex-wrap ${
        newLine
          ? 'flex-col items-center text-center'
          : 'md:flex-row md:items-end'
      }`}
    >
      <div className="rounded-full bg-zinc-400 w-[150px] h-[150px] overflow-hidden relative border-4 border-white">
        <div className="h-full">
          {src ? <img src={src} alt="Profile Image" /> : null}
          {isUpdate ? (
            <div className="absolute z-10 inset-0 h-full">
              <ImageUpload
                setImage={setImage}
                handler="handleProfileAvatarImageUpload"
              />
            </div>
          ) : null}
        </div>
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
