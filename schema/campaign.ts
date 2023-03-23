import { z } from 'zod';

export const campaignSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string(),
  campaign_image_url: z.string().url().or(z.literal('')),
  budget: z.string().or(z.number()),
  duration: z.string().or(z.number()),
  enabled: z.boolean(),
  isLive: z.boolean(),
});

export type CampaignSchema = z.infer<typeof campaignSchema>;
