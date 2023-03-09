import { MAX_CHARACTERS } from '@/utils/contstants';
import { z } from 'zod';

export const profileSchema = z.object({
  username: z.string(),
  name: z.string(),
  subtitle: z.string(),
  description: z
    .string()
    .max(
      MAX_CHARACTERS,
      `Bio description cannot be longer than ${MAX_CHARACTERS} characters`
    ),
  isPromoted: z.boolean(),
  profile_links: z
    .object({
      label: z.string(),
      target: z.string().url(),
      alias: z.string(),
      linkId: z.string(),
      trackMetrics: z.boolean(),
      doesAcceptAds: z.boolean(),
    })
    .array(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
