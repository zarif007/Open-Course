import { ICourse } from '@/types/course';
import { ZodType, z } from 'zod';
import userSchema from './user';
import { courseTopicSchema } from './courseTopic';

export const courseSchema: ZodType<Partial<ICourse>> = z.object({
  title: z.string(),
  type: z.literal('gn').or(z.literal('org')),
  version: z.number(),
  enabled: z.boolean().optional(),
  creator: userSchema.or(z.string()),
  contributors: z.array(userSchema).or(z.array(z.string())),
  enrolledUsers: z.array(userSchema).or(z.array(z.string())),
  categories: z.array(z.string()).or(z.array(z.never())).optional(),
  levels: z.array(z.string()).or(z.array(z.never())).optional(),
  languages: z.array(z.string()).or(z.array(z.never())).optional(),
  description: z.string().optional(),
  banner: z.string(),
  slug: z.string(),
  topics: z
    .array(courseTopicSchema)
    .or(z.array(z.string()))
    .or(z.array(z.never())),
  tags: z.array(z.string()).optional(),
  status: z.string(),
  reviews: z
    .array(
      z.object({
        user: userSchema.or(z.string()),
        rating: z.number(),
        comment: z.string(),
      })
    )
    .or(z.array(z.never())),
  coursePrivacy: z.literal('public').or(z.literal('private')),
  topicPrivacy: z.literal('open').or(z.literal('locked')),
});
