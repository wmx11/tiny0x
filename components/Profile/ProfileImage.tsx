import { SetImage } from '@/types/Files';
import { Text, Title } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { FC } from 'react';
import ImageUpload from '../ImageUpload';

type ProfileImageTypes<T> = {
  src?: string;
  title?: string;
  subtitle?: string;
  newLine?: boolean;
  isUpdate?: boolean;
  form?: UseFormReturnType<T>;
  formPath?: string;
} & SetImage;

const ProfileImage = <T,>({
  src,
  title,
  subtitle,
  newLine,
  isUpdate,
  setImage,
  form,
  formPath,
}: ProfileImageTypes<T>) => {
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
                initialImage={src}
                setImage={setImage}
                handler="handleProfileAvatarImageUpload"
                form={form}
                formPath={formPath}
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
