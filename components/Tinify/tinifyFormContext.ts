import { TinifySchema } from '@/schema/tinify';
import { createFormContext } from '@mantine/form';

export const [TinifyFormProvider, useTinifyFormContext, useTinifyForm] =
  createFormContext<TinifySchema>();
