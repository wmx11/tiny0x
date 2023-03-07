import { z } from 'zod';

export const tinifySchema = z.object({
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters long')
    .max(24, 'Slug cannot be more than 24 characters long')
    .optional()
    .or(z.literal('')),
  title: z.string().optional(),
  description: z.string().optional(),
  target: z.string().url(),
  doesAcceptAds: z.boolean(),
  trackMetrics: z.boolean(),
  enabled: z.boolean(),
});

export type TinifySchema = z.infer<typeof tinifySchema>;
