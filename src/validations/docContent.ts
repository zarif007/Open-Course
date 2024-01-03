import { IDocContent } from '@/types/courseTopic';
import validateText from '@/utils/validations/validateText';
import { ZodType, z } from 'zod';

export const docContentSchema: ZodType<IDocContent> = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be minimum 5 characters' })
    .max(500, { message: 'Title must be maximum 500 characters' })
    .trim()
    .refine((text) => validateText(text), { message: 'Invalid Text' }),
  content: z
    .string()
    .min(10, { message: 'Content must be minimum 10 characters' })
    .max(20000, { message: 'Content must be maximum 20000 characters' })
    .trim()
    .refine((text) => validateText(text), { message: 'Invalid Text' }),
  duration: z.number().optional(),
});
