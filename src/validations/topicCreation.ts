import { ZodType, z } from "zod";

export const topicCreationSchema: ZodType<{
  title: string;
  url: string;
  description: string;
  duration: number;
}> = z.object({
  title: z.string().min(2).max(200),
  url: z.string().url({ message: "Invalid url" }),
  description: z.string().min(0).max(500),
  duration: z.number().min(0).max(10000),
});
