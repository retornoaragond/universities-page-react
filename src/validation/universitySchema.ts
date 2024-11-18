import { z } from 'zod';

export const universitySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  location: z.string().min(1, 'Location is required'),
  website_url: z
    .string()
    .url('Website URL must be a valid URL')
    .min(1, 'Website URL is required'),
  contact_emails: z
    .array(
      z.object({
        email: z.string().email('Invalid email format'),
      }),
    )
    .min(1, 'At least one contact email is required'),
});

export type UniversitySchemaType = z.infer<typeof universitySchema>;
