import { ICourseAsk } from "@/types/courseAsk";
import { ZodType, z } from "zod";

export const courseAskSchema: ZodType<ICourseAsk> = z.object({
  title: z.string().min(2).max(50),
  author: z.string().min(2).max(500),
  course: z.string().min(2).max(500),
  topic: z.string().min(2).max(500),
  question: z.string().min(2).max(500),
});
