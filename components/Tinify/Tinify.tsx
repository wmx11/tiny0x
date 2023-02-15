import { Button, Text, TextInput } from '@mantine/core';
import React from 'react';

const Tinify = () => {
  return (
    <div>
      <div className="flex gap-2 w-full mb-2">
        <TextInput
          size="lg"
          className="flex-1"
          placeholder="https://my-super-long-url.com/with-some-long-slug"
        />
        <Button size="lg">Create</Button>
      </div>
      <Text size="sm" color="dimmed">
        By clicking TINIFY, you are agreeing to Tiny0x's Terms of Service,
        Privacy Policy
      </Text>
    </div>
  );
};

export default Tinify;
