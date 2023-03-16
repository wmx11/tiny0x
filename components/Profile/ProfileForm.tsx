import apiRoutes from '@/routes/api';
import generalRoutes from '@/routes/general';
import { ProfileSchema, profileSchema } from '@/schema/profile';
import { ProfileLink } from '@/types/Profile';
import { signedRequest } from '@/utils/api/signedRequest';
import { MAX_CHARACTERS } from '@/utils/contstants';
import Icons from '@/utils/icons';
import { uploadProfileImage } from '@/utils/utils';
import { Text, Textarea, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Profile } from '@prisma/client';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons';
import ProfileHeader from './ProfileHeader';
import ProfileImage from './ProfileImage';
import ProfileLinkFields from './ProfileLinkFields';

type ProfileFormTypes = {
  isUpdate?: boolean;
  profile?: Profile;
};

const ProfileForm: FC<ProfileFormTypes> = ({ isUpdate, profile }) => {
  const [avatarImage, setAvatarImage] = useState<Blob | null>(null);
  const [headerImage, setHeaderImage] = useState<Blob | null>(null);
  const router = useRouter();

  const form = useForm<ProfileSchema>({
    validate: zodResolver(profileSchema),
    initialValues: {
      username: profile?.username || '',
      name: profile?.name || '',
      subtitle: profile?.subtitle || '',
      description: profile?.description || '',
      isPromoted: profile?.isPromoted ?? false,
      profile_image_url: profile?.profile_image_url ?? '',
      header_image_url: profile?.header_image_url ?? '',
      profile_links:
        (profile?.profile_links as ProfileLink[]) || ([] as ProfileLink[]),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const valuesCopy = { ...values };

    try {
      if (avatarImage) {
        const data = await uploadProfileImage(avatarImage);
        if (data.ok) {
          valuesCopy.profile_image_url = data.results.url;
        }
      }

      if (headerImage) {
        const data = await uploadProfileImage(headerImage);
        if (data.ok) {
          valuesCopy.header_image_url = data.results.url;
        }
      }

      const data = await signedRequest({
        type: 'post',
        data: { ...valuesCopy, profileId: profile?.id, isUpdate },
        url: apiRoutes.profile.createOrUpdate,
      });

      router.push(generalRoutes.profile.profile);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <ProfileHeader
          isUpdate={true}
          src={form?.values?.header_image_url as string}
          setImage={setHeaderImage}
          form={form}
          formPath="header_image_url"
        />
        <div className="mt-[-60px] md:ml-6 flex flex-col md:flex-row items-center md:items-end flex-wrap">
          <ProfileImage
            isUpdate={true}
            src={form?.values?.profile_image_url as string}
            setImage={setAvatarImage}
            form={form}
            formPath="profile_image_url"
          />
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
            maxLength={MAX_CHARACTERS}
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
                <ProfileLinkFields form={form} />
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
