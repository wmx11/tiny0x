import { Text } from '@mantine/core';
import React from 'react';

const ProfileHeader = ({ src }: { src?: string }) => {
  return (
    <div className="h-[200px] bg-zinc-400 overflow-hidden rounded-md relative">
      <div className="absolute right-5 top-5">
        <Text weight={700} color="dimmed">
          #114
        </Text>
      </div>
      {src ? <img src={src} alt="Profile Header Image" /> : null}
    </div>
  );
};

export default ProfileHeader;
