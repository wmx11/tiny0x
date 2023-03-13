import { Text } from '@mantine/core';
import React from 'react';
import ImageUpload from '../ImageUpload';

const ProfileHeader = ({
  src,
  isUpdate,
}: {
  src?: string;
  isUpdate?: boolean;
}) => {
  return (
    <div className="h-[200px] bg-zinc-400 overflow-hidden rounded-md relative">
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
              setImage={() => null}
              handler="handleProfileHeaderImageUpload"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileHeader;
