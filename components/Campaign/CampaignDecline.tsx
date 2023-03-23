import { MAX_CHARACTERS } from '@/utils/contstants';
import { Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { PrimaryButton } from '../Buttons/Buttons';

const CampaignDecline = ({
  handler,
}: {
  handler: (review: string) => void;
}) => {
  const form = useForm({
    validate: {
      review: (v) =>
        v.length > MAX_CHARACTERS
          ? `Feedback length cannot be longer than ${MAX_CHARACTERS} characters`
          : null,
    },
    initialValues: {
      review: '',
    },
  });

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => handler(values.review))}>
        <Textarea
          label="Your feedback"
          description="Please provide short feedback why you are declining this campaign."
          minRows={5}
          maxLength={MAX_CHARACTERS}
          className="mb-4"
          required
          withAsterisk
          {...form.getInputProps('review')}
        />

        <div className="flex justify-end">
          <PrimaryButton type="submit">Decline</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default CampaignDecline;
