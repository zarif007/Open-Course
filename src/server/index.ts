import Course from "@/lib/models/course.model";
import { publicProcedure, router } from "./trpc";
import CourseAsk from "@/lib/models/courseAsk.model";
import { z } from "zod";
import { courseAskSchema } from "@/validations/courseAsk";
import { ICourseAsk } from "@/types/courseAsk";

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
      console.log(input);
      return await CourseAsk.find({ topic, version })
        .limit(10)
        .sort({ updatedAt: -1 })
        .populate("author");
    }),
  getAskBySlug: publicProcedure
    .input(z.string())
    .query(async ({ input }): Promise<ICourseAsk | null> => {
      const ask = await CourseAsk.findOne({ slug: input });
      await ask.populate("author");
      return ask;
    }),
  createCourseAsks: publicProcedure
    .input(courseAskSchema)
    .mutation(async ({ input }) => {
      return await CourseAsk.create(input);
    }),
  updateCourseAsks: publicProcedure
    .input(courseAskSchema)
    .mutation(async ({ input }) => {
      return await CourseAsk.findOneAndUpdate({ slug: input.slug }, input);
    }),
});

export type AppRouter = typeof appRouter;
