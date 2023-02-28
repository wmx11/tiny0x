import { z } from 'zod';

export const profileSchema = z.object({
  username: z.string(),
  name: z.string(),
  subtitle: z.string(),
  description: z.string(),
  isPromoted: z.boolean(),
  profile_links: z
    .object({
      label: z.string(),
      target: z.string(),
    })
    .array(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
