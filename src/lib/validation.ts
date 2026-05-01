import { z } from "zod";

export const leadSchema = z.object({
  email: z.string().trim().email(),
  whatsapp: z.string().trim().min(8),
  hp: z.string().optional(),
  referrer: z.string().optional(),
  utm: z.record(z.string(), z.string()).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
