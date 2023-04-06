import { truncateAddress } from '@/utils/utils';
import { Divider, ScrollArea, Text, Textarea } from '@mantine/core';
import React from 'react';
import { PrimaryButton } from './Buttons/Buttons';
import { GlassCard } from './Cards/Cards';

const ShillBox = () => {
  return (
    <GlassCard className="h-full flex flex-col justify-between">
      <div>
        <div>
          <Text weight={700} size="lg">
            Shill Box
          </Text>
          <Divider my="lg" />
        </div>

        <div className="flex flex-col justify-between mb-2">
          <ScrollArea h={580} offsetScrollbars>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <Text size="xs" color="dimmed">
                    {truncateAddress(
                      '0x6c957d7030fbac6e070c84b4370e3c8cb6e99cd7',
                      8
                    )}
                  </Text>
                  <Text size="xs" color="dimmed">
                    2022-02-22
                  </Text>
                </div>
                <div>
                  <Text size="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat 😂 
                  </Text>
                </div>
                <Divider my="lg" />
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>

      <div className="w-full">
        <Textarea className="mb-2" />
        <PrimaryButton className="w-full">Post</PrimaryButton>
      </div>
    </GlassCard>
  );
};

export default ShillBox;
