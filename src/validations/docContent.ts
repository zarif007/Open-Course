import { IDocContent } from '@/types/courseTopic';
import { ZodType, z } from 'zod';

export const docContentSchema: ZodType<IDocContent> = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be minimum 5 characters' })
    .max(500, { message: 'Title must be maximum 500 characters' })
    .trim(),
  content: z
    .string()
    .min(10, { message: 'Content must be minimum 10 characters' })
    .max(20000, { message: 'Content must be maximum 20000 characters' })
    .trim(),
  duration: z.number().optional(),
});
