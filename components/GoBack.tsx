import Icons from '@/utils/icons';
import { Button, Text } from '@mantine/core';
import { useRouter } from 'next/router';

const GoBack = () => {
  const router = useRouter();
  return (
    <Button
      variant="subtle"
      color="grape"
      leftIcon={<Icons.ArrowLeft />}
      onClick={() => router.back()}
      className="mb-4"
    >
      <Text>Go Back</Text>
    </Button>
  );
};

export default GoBack;
