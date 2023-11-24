import { IFreeSourceContent } from "@/types/courseTopic";
import { ZodType, z } from "zod";

export const FreeSourceContentSchema: ZodType<Partial<IFreeSourceContent>> =
  z.object({
    title: z.string().min(2).max(200),
    url: z.string().url({ message: "Invalid url" }),
    description: z.string().min(0).max(500),
    duration: z.number().min(0).max(10000),
    source: z.string().optional(),
  });
