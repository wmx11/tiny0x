import { ActionIcon, Text, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Icons from '@/utils/icons';
import { SecondaryButton } from '../Buttons/Buttons';
import { GlassCard } from '../Cards/Cards';

const ProfileCrud = () => {
  const form = useForm({
    initialValues: {
      username: '',
      name: '',
      subtitle: '',
      description: '',
      isPromoted: false,
      profile_links: [{ label: '', target: '' }],
    },
  });

  const linkFields = form.values.profile_links.length ? (
    form.values.profile_links.map((_, index) => (
      <Draggable key={index} index={index} draggableId={index.toString()}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="flex items-center gap-2 mb-4"
          >
            <div {...provided.dragHandleProps} className="">
              <Icons.GripVertical />
            </div>
            <GlassCard className="w-full">
              <div className="flex items-start gap-2 justify-between w-full">
                <TextInput
                  className="flex-1"
                  label="Label"
                  description="Label of your link button"
                  placeholder="Twitter"
                  {...form.getInputProps(`profile_links.${index}.label`)}
                />
                <TextInput
                  className="flex-1"
                  label="Link"
                  description="Link of your button"
                  placeholder="https://..."
                  {...form.getInputProps(`profile_links.${index}.target`)}
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

  return (
    <div>
      <form action="" className="flex flex-col gap-4">
        <TextInput
          label="Username"
          description="Your username which will be used to find your profile online"
          placeholder="@MyCoolName"
        />
        <TextInput
          label="Name"
          description="Your name that will be displayed on the profile."
        />
        <TextInput
          label="Subtitle"
          description="A small description about you and what you do."
          placeholder="Developer/Musician/Web3 Enthusiast/etc..."
        />
        <Textarea
          label="Bio"
          description="A small description about you and what you do."
        />
        <Text weight={700} color="white">
          My Links
        </Text>
        <DragDropContext
          onDragEnd={({ destination, source }) => {
            console.log(destination, source);

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
        <div className="flex items-center justify-center w-full">
          <SecondaryButton
            rightIcon={<Icons.Add />}
            onClick={() =>
              form.insertListItem('profile_links', { label: '', target: '' })
            }
          >
            Add Link
          </SecondaryButton>
        </div>
      </form>
    </div>
  );
};

export default ProfileCrud;
