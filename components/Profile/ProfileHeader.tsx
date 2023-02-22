import { Text } from '@mantine/core';
import React from 'react';

const ProfileHeader = ({ src }: { src: string }) => {
  return (
    <div className="h-[200px] overflow-hidden rounded-md relative">
      <div className="absolute right-5 top-5">
        <Text weight={700} color="dimmed">
          #114
        </Text>
      </div>
      <img src={src} alt="Profile Header Image" />
    </div>
  );
};

export default ProfileHeader;
