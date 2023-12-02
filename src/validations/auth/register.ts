import IRegisterInputs from "@/types/auth/register";
import { ZodType, z } from "zod";

const registerInputsSchema: ZodType<IRegisterInputs> = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export default registerInputsSchema;
