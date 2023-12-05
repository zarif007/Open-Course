import { IAskResponse } from '@/types/courseAsk/response';
import { ZodType, z } from 'zod';

export const askResponseSchema: ZodType<Partial<IAskResponse>> = z.object({
  id: z.string().optional(),
  author: z.string().min(2).max(500),
  topic: z.string().min(2).max(500),
  version: z.number(),
  answer: z
    .string()
    .min(10, { message: 'Question must be minimum 10 characters' })
    .max(20000, { message: 'Question must be maximum 20000 characters' })
    .trim(),
  upVote: z.array(z.string()).optional(),
  downVote: z.array(z.string()).optional(),
});
