import { Paper, Text } from '@mantine/core';
import React, { FC, PropsWithChildren } from 'react';

type NotFoundTypes = {} & PropsWithChildren;

const NotFound: FC<NotFoundTypes> = ({ children }) => {
  return (
    <Paper shadow="lg" p="lg">
      {children ? (
        children
      ) : (
        <Text align="center" weight={700}>
          We {"couldn't"} find the resource you were looking for.
        </Text>
      )}
    </Paper>
  );
};

export default NotFound;
