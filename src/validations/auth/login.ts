import ILoginInputs from "@/types/auth/login";
import IRegisterInputs from "@/types/auth/register";
import { ZodType, z } from "zod";

const loginInputsSchema: ZodType<ILoginInputs> = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default loginInputsSchema;
