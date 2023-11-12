import Course from "@/lib/models/course.model";
import { publicProcedure, router } from "./trpc";
import CourseAsk from "@/lib/models/courseAsk.model";
import { z } from "zod";
import { courseAskSchema } from "@/validations/courseAsk";

export const appRouter = router({
  getCourseAsks: publicProcedure
    .input(
      z.object({
        author: z.string().optional(),
        topicId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { author, topicId } = input;
      return await CourseAsk.find({ author, topicId }).limit(10);
    }),
  createCourseAsks: publicProcedure
    .input(courseAskSchema)
    .query(async ({ input }) => {
      return await CourseAsk.create(input);
    }),
});

export type AppRouter = typeof appRouter;
