import { connectToDB } from '@/lib/connectToMongoose';
import User from '@/lib/models/user.model';
import registerInputsSchema from '@/validations/auth/register';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.json();

    const isValid = registerInputsSchema.safeParse(payload);

    if (!isValid.success) {
      return NextResponse.json({
        data: null,
        status: 400,
        success: false,
        message: 'Invalid data',
      });
    }

    const { name, email, password } = payload;

    await connectToDB();

    const isExits = await User.findOne({ email }).select('_id');

    if (isExits) {
      return NextResponse.json({
        data: null,
        status: 400,
        success: false,
        message: 'User with this email already exits',
      });
    }

    const salt = process.env.SALT!;
    const hashedPassword = await bcrypt.hash(password, parseInt(salt));

    const user = await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({
      data: user,
      status: 201,
      success: true,
      message: 'Created Successfully',
    });
  } catch (error) {
    let status = 500;
    let message = 'Internal server error';
    if (error instanceof z.ZodError) {
      status = 422;
      message = 'Invalid data';
    }
    return NextResponse.json({
      data: null,
      status,
      message,
      success: false,
    });
  }
};
