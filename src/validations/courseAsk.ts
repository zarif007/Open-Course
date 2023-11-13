import { ICourseAsk } from "@/types/courseAsk";
import { ZodType, z } from "zod";

export const courseAskSchema: ZodType<Partial<ICourseAsk>> = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be minimum 2 characters" })
    .max(200, { message: "Title must be maximum 200 characters" }),
  author: z.string().min(2).max(500),
  slug: z.string().min(10).max(250),
  topic: z.string().min(2).max(500),
  question: z
    .string()
    .min(10, { message: "Question must be minimum 10 characters" })
    .max(2000, { message: "Question must be maximum 2000 characters" }),
});

export const courseAskInputSchema: ZodType<Partial<ICourseAsk>> = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be minimum 2 characters" })
    .max(200, { message: "Title must be maximum 200 characters" }),
  question: z
    .string()
    .min(10, { message: "Question must be minimum 10 characters" })
    .max(2000, { message: "Question must be maximum 2000 characters" }),
});
