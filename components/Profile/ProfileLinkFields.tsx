import { ProfileSchema } from '@/schema/profile';
import Icons from '@/utils/icons';
import { ActionIcon, Checkbox, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React, { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GlassCard } from '../Cards/Cards';

type ProfileLinkFieldsTypes = {
  form?: UseFormReturnType<ProfileSchema>;
};

const ProfileLinkFields = ({ form }: ProfileLinkFieldsTypes) => {
  if (!form?.values.profile_links.length) {
    return (
      <GlassCard>
        <Text>You currently have no links</Text>
      </GlassCard>
    );
  }

  return (
    <>
      {form?.values.profile_links?.map((_, index) => (
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
      ))}
    </>
  );
};

export default ProfileLinkFields;
