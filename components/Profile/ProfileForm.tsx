import apiRoutes from '@/routes/api';
import generalRoutes from '@/routes/general';
import { uploadImageToBucket } from '@/services/images';
import { ProfileLink } from '@/types/Profile';
import { signedRequest } from '@/utils/api/signedRequest';
import config from '@/utils/config';
import { MAX_CHARACTERS } from '@/utils/contstants';
import Icons from '@/utils/icons';
import {
  ActionIcon,
  Button,
  Checkbox,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Profile } from '@prisma/client';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons';
import { GlassCard } from '../Cards/Cards';
import ProfileHeader from './ProfileHeader';
import ProfileImage from './ProfileImage';

type ProfileFormTypes = {
  isUpdate?: boolean;
  profile?: Profile;
};

const ProfileForm: FC<ProfileFormTypes> = ({ isUpdate, profile }) => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      username: profile?.username || '',
      name: profile?.name || '',
      subtitle: profile?.subtitle || '',
      description: profile?.description || '',
      isPromoted: profile?.isPromoted ?? false,
      profile_links:
        (profile?.profile_links as ProfileLink[]) || ([] as ProfileLink[]),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const data = await signedRequest({
        type: 'post',
        data: { ...values, profileId: profile?.id, isUpdate },
        url: apiRoutes.profile.createOrUpdate,
      });

      router.push(generalRoutes.profile.profile);
    } catch (error) {
      console.log(error);
    }
  };

  const linkFields = form.values.profile_links.length ? (
    form.values.profile_links.map((_, index) => (
      <Draggable key={index} index={index} draggableId={index.toString()}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="flex items-center gap-2 mb-4"
          >
            <div {...provided.dragHandleProps} className="text-2xl">
              <Icons.GripVertical />
            </div>
            <GlassCard className="w-full">
              <div className="flex flex-col md:flex-row flex-wrap items-start gap-2 justify-between w-full mb-4">
                <TextInput
                  className="flex-1 w-full"
                  label="Label"
                  description="Label of your link button"
                  placeholder="Twitter"
                  size="md"
                  {...form.getInputProps(`profile_links.${index}.label`)}
                />
                <TextInput
                  className="flex-1 w-full"
                  label="Link"
                  description="Link of your button"
                  placeholder="https://..."
                  size="md"
                  {...form.getInputProps(`profile_links.${index}.target`)}
                />
              </div>
              <div className="flex flex-col md:flex-row flex-wrap gap-4">
                <Checkbox
                  size="md"
                  label="Track Clicks and Traffic"
                  description="Do you want to track the click through rate going to the new Tiny link?"
                  className="flex-1"
                  {...form.getInputProps(
                    `profile_links.${index}.trackMetrics`,
                    {
                      type: 'checkbox',
                    }
                  )}
                />
                <Checkbox
                  size="md"
                  label="Accept Advertising"
                  description="Do you allow other users or projects to display ads using your link? 80% of the ad's budget would be allocated to your account."
                  className="flex-1"
                  {...form.getInputProps(
                    `profile_links.${index}.doesAcceptAds`,
                    {
                      type: 'checkbox',
                    }
                  )}
                />
              </div>
            </GlassCard>
            <ActionIcon
              className=""
              variant="light"
              color="red"
              onClick={() => form.removeListItem('profile_links', index)}
            >
              <Icons.Trash />
            </ActionIcon>
          </div>
        )}
      </Draggable>
    ))
  ) : (
    <GlassCard>
      <Text>You currently have no links</Text>
    </GlassCard>
  );

  const [image, setImage] = useState<Blob | null>(null);

  const testUpload = async () => {
    const fs = new FormData();
    fs.append('type', 'uploadImageToBucket');
    fs.append('image', image as Blob);
    fs.append('filename', `${config.images.profile.path}/${nanoid()}.png`);
    fs.append('acl', 'public-read');

    // const data = await signedRequest({
    //   type: 'post',
    //   url: apiRoutes.image,
    //   data: fs,
    //   isFormData: true,
    // });

    console.log(image);
  };

  return (
    <div>
      <div>
        <Text>Test image Upload</Text>
        <ProfileImage isUpdate={true} setImage={setImage} />
        <Button onClick={testUpload}>Upload</Button>
      </div>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <ProfileHeader isUpdate={true} />
        <div className="mt-[-60px] md:ml-6 flex flex-col md:flex-row items-center md:items-end flex-wrap">
          <ProfileImage isUpdate={true} />
        </div>
        <TextInput
          label="Username"
          description="Your username which will be used to find your profile online"
          placeholder="@MyCoolName"
          size="md"
          {...form.getInputProps('username')}
        />
        <TextInput
          label="Name"
          description="Your name that will be displayed on the profile."
          size="md"
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Subtitle"
          description="A small description about you and what you do."
          placeholder="Developer/Musician/Web3 Enthusiast/etc..."
          size="md"
          {...form.getInputProps('subtitle')}
        />
        <div>
          <Textarea
            label="Bio"
            description="A small description about you and what you do."
            size="md"
            minRows={10}
            className="mb-4"
            {...form.getInputProps('description')}
          />
          <Text size="sm" color="dimmed">
            Characters left: {form.values.description.length}/{MAX_CHARACTERS}
          </Text>
        </div>
        <Text weight={700} color="white">
          My Links
        </Text>
        <DragDropContext
          onDragEnd={({ destination, source }) => {
            form.reorderListItem('profile_links', {
              from: source.index,
              to: destination?.index || 0,
            });
          }}
        >
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {linkFields}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="flex items-center justify-center w-full mb-4">
          <SecondaryButton
            rightIcon={<Icons.Add />}
            size="md"
            onClick={() =>
              form.insertListItem('profile_links', {
                label: '',
                target: '',
                doesAcceptAds: false,
                trackMetrics: false,
              } as ProfileLink)
            }
          >
            Add Link
          </SecondaryButton>
        </div>

        <PrimaryButton type="submit" size="lg">
          {isUpdate ? 'Update' : 'Create Profile'}
        </PrimaryButton>
      </form>
    </div>
  );
};

export default ProfileForm;
