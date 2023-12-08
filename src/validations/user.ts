import { IUser } from '@/types/user';
import { ZodType, z } from 'zod';

const userSchema: ZodType<IUser> = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().optional(),
  isEmailVerified: z.boolean().optional(),
  image: z.string(),
  role: z.enum(['super_admin', 'admin', 'user', 'pro_User']).optional(),
  preferences: z.array(z.string()).optional(),
  userName: z.string().optional(),
  bio: z.string().optional(),
  points: z.number().optional(),
});

export default userSchema;
