import { ZodType, z } from "zod";

export const courseReviewSchema: ZodType<{
  user?: string;
  rating: number;
  comment: string;
}> = z.object({
  user: z.string().optional(),
  comment: z
    .string()
    .min(2, { message: "Comment must be minimum 2 characters" })
    .max(400, { message: "Comment must be maximum 400 characters" })
    .trim(),
  rating: z
    .number()
    .min(1, { message: "Rating can not be less than 1" })
    .max(5, { message: "Rating can not be more than 5" }),
});
