import { z } from 'zod';

export const contactCategories = ['personal', 'work', 'other'] as const;
export type ContactCategory = (typeof contactCategories)[number];

export const contactInputSchema = z.object({
  firstName: z.string().trim().min(1).max(50),
  lastName: z.string().trim().min(1).max(50),
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  phone: z.string().trim().min(3).max(30),
  company: z.string().trim().max(100).optional().or(z.literal('')),
  category: z.enum(contactCategories).default('personal'),
  notes: z.string().trim().max(500).optional().or(z.literal(''))
});

export const contactQuerySchema = z.object({
  search: z.string().trim().max(100).optional(),
  category: z.enum(contactCategories).optional()
});

export type ContactInput = z.infer<typeof contactInputSchema>;
