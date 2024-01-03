import { IEmbedContent } from '@/types/courseTopic';
import validateText from '@/utils/validations/validateText';
import validateURL from '@/utils/validations/validateURL';
import { ZodType, z } from 'zod';

export const embedContentSchema: ZodType<IEmbedContent> = z.object({
  title: z
    .string()
    .min(2)
    .max(200)
    .refine((text) => validateText(text), { message: 'Invalid Text' }),
  url: z.string().refine((url) => validateURL(url), { message: 'Invalid URL' }),
  description: z.string().optional(),
  duration: z.number().min(0).max(10000),
  source: z.string().optional(),
});
