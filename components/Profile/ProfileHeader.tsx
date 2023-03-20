import { SetImage } from '@/types/Files';
import { Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React, { FC } from 'react';
import ImageUpload from '../ImageUpload';

type ProfileHeaderTypes<T> = {
  src?: string;
  isUpdate?: boolean;
  form?: UseFormReturnType<T>;
  formPath?: string;
} & SetImage;

const ProfileHeader = <T,>({
  src,
  isUpdate,
  setImage,
  form,
  formPath,
}: ProfileHeaderTypes<T>) => {
  return (
    <div className="h-full max-h-[200px] bg-zinc-400 overflow-hidden rounded-md relative">
      <div className="absolute right-5 top-5">
        <Text weight={700} color="dimmed">
          #114
        </Text>
      </div>
      <div className="h-full">
        {src ? <img src={src} alt="Profile Header Image" /> : null}
        {isUpdate ? (
          <div className="absolute inset-0 h-full">
            <ImageUpload
              initialImage={src}
              setImage={setImage}
              handler="handleProfileHeaderImageUpload"
              form={form}
              formPath={formPath}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileHeader;
