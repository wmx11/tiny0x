import { Button } from '@mantine/core';
import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileImage from './ProfileImage';

const ProfileCard = () => {
  return (
    <div>
      <ProfileHeader src="https://static.vecteezy.com/system/resources/previews/001/984/880/original/abstract-colorful-geometric-overlapping-background-and-texture-free-vector.jpg" />
      <div className="translate-y-[-60px] ml-6">
        <ProfileImage
          title="John Doe"
          subtitle="Some Title"
          src="https://images.unsplash.com/photo-1628563694622-5a76957fd09c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
        />
      </div>
      <div className="mb-8">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem
      </div>
      <div className="flex flex-col gap-4">
        <Button size="md">Discord</Button>
        <Button size="md">Telegram</Button>
        <Button size="md">Twitter</Button>
        <Button size="md">LinkedIn</Button>
      </div>
    </div>
  );
};

export default ProfileCard;
