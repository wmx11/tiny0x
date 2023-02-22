import Icons from '@/utils/icons';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import React, { FC } from 'react';

type ClipboardButtonTypes = {
  copy: string;
};

const ClipboardButton: FC<ClipboardButtonTypes> = ({ copy }) => {
  const clipboard = useClipboard({ timeout: 1000 });

  return (
    <ActionIcon
      onClick={() => clipboard.copy(copy)}
      color="grape"
      variant="light"
    >
      {clipboard.copied ? (
        <Icons.Check />
      ) : (
        <Tooltip label="Copy">
          <Icons.Copy />
        </Tooltip>
      )}
    </ActionIcon>
  );
};

export default ClipboardButton;
