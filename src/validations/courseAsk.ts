import { ICourseAsk } from "@/types/courseAsk";
import { ZodType, string, z } from "zod";

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
    .max(4000, { message: "Question must be maximum 4000 characters" }),
  responses: z
    .array(z.object({ user: z.string(), answer: z.string() }))
    .optional(),
  theAnswers: z.array(z.string()).optional(),
  upVote: z.array(z.string()).optional(),
  downVote: z.array(z.string()).optional(),
  tags: z.array(z.string()).min(0).max(7).optional(),
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
