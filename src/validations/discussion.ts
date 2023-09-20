import { ZodType, z } from "zod";

export const commentCreationSchema: ZodType<{
  comment: string;
}> = z.object({
  comment: z
    .string()
    .min(2, { message: "Comment Can not be less then 2 characters" })
    .max(1250, { message: "Comment Can not be more then 1250 characters" }),
});
