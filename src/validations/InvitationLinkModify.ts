import { ZodType, z } from "zod";

interface IInvitationLinkModify {
  expiresIn: number;
  maxCapacity: number;
}

export const InvitationLinkModifySchema: ZodType<
  Partial<IInvitationLinkModify>
> = z.object({
  expiresIn: z
    .number()
    .min(1, { message: "Must be at least 1 Day" })
    .max(10, { message: "Can be 10 Day max" }),
  maxCapacity: z
    .number()
    .min(1, { message: "Must be at least 1 Person" })
    .max(100, { message: "Can be 100 person max" }),
});
