import { Button, ButtonProps } from '@mantine/core';
import { FC } from 'react';

type ButtonPropsExtended = ButtonProps & {
  onClick?: () => void;
  component?: any;
  href?: string;
};

export const PrimaryButton: FC<ButtonPropsExtended> = (props) => {
  return (
    <Button
      {...props}
      variant="gradient"
      gradient={{ from: 'pink', to: 'violet' }}
    >
      {props.children}
    </Button>
  );
};

export const SecondaryButton: FC<ButtonPropsExtended> = (props) => {
  return (
    <Button
      {...props}
      variant="gradient"
      gradient={{ from: 'yellow', to: 'orange' }}
    >
      {props.children}
    </Button>
  );
};
