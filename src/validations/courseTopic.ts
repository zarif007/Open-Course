import { ICourseTopic } from '@/types/courseTopic';
import { ZodType, z } from 'zod';
import { embedContentSchema } from './embedContent';
import { docContentSchema } from './docContent';

export const courseTopicSchema: ZodType<ICourseTopic> = z.object({
  topicID: z.number(),
  sortID: z.number().optional(),
  views: z.number().optional(),
  versions: z.array(
    z
      .object({
        type: z.literal('free_source_content'),
        creator: z.string(),
        data: embedContentSchema,
      })
      .or(
        z.object({
          type: z.literal('doc_content'),
          creator: z.string(),
          data: docContentSchema,
        })
      )
  ),
});
