import { publicProcedure, router } from './trpc';
import CourseAsk from '@/lib/models/courseAsk.model';
import { z } from 'zod';
import { courseAskSchema } from '@/validations/courseAsk';
import { ICourseAsk } from '@/types/courseAsk';
import { IAskResponse } from '@/types/courseAsk/response';
import AskResponse from '@/lib/models/askResponse.model';
import { askResponseSchema } from '@/validations/AskResponse';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export const appRouter = router({
  getCourseAsks: publicProcedure
    .input(
      z.object({
        topic: z.string().optional(),
        version: z.number().optional(),
      })
    )
    .query(async ({ input }): Promise<ICourseAsk[] | null> => {
      const { topic, version } = input;

      return await CourseAsk.find({ topic, version })
        .limit(10)
        .sort({ updatedAt: -1 })
        .populate('author');
    }),
  getAskBySlug: publicProcedure
    .input(z.string())
    .query(async ({ input }): Promise<ICourseAsk | null> => {
      const ask = await CourseAsk.findOne({ slug: input });
      await ask.populate('author');
      return ask;
    }),
  createCourseAsks: publicProcedure
    .input(courseAskSchema)
    .mutation(async ({ input }) => {
      const session = await getServerSession(authOptions);

      if (!session) return null;

      return await CourseAsk.create(input);
    }),
  updateCourseAsks: publicProcedure
    .input(courseAskSchema)
    .mutation(async ({ input }) => {
      const session = await getServerSession(authOptions);

      if (!session) return null;

      return await CourseAsk.findOneAndUpdate({ slug: input.slug }, input);
    }),

  // responses
  getAskResponses: publicProcedure
    .input(
      z.object({
        topic: z.string().optional(),
        questionId: z.string().optional(),
        version: z.number().optional(),
      })
    )
    .query(async ({ input }): Promise<IAskResponse[] | null> => {
      const { topic, questionId, version } = input;

      return await AskResponse.find({ topic, questionId, version })
        .limit(10)
        .populate('author');
    }),

  createAskResponse: publicProcedure
    .input(askResponseSchema)
    .mutation(async ({ input }) => {
      const session = await getServerSession(authOptions);

      if (!session) return null;

      return await AskResponse.create(input);
    }),
  updateAskResponse: publicProcedure
    .input(askResponseSchema)
    .mutation(async ({ input }) => {
      const session = await getServerSession(authOptions);

      if (!session) return null;

      return await AskResponse.findOneAndUpdate({ _id: input.id }, input);
    }),
});

export type AppRouter = typeof appRouter;
