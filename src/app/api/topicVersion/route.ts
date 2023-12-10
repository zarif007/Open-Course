import { connectToDB } from '@/lib/connectToMongoose';
import TopicVersion from '@/lib/models/topicVersion.model';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const POST = async (req: NextRequest) => {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({
        status: 401,
        message: 'Unauthorized: Login required!!!',
        data: null,
        success: false,
      });
    }

    const payload = await req.json();

    // const isValid = registerInputsSchema.safeParse(payload);

    // if (!isValid.success) {
    //   return NextResponse.json({
    //     data: null,
    //     status: 400,
    //     success: false,
    //     message: 'Invalid data',
    //   });
    // }

    await connectToDB();

    const newVersion = await TopicVersion.create(payload);

    return NextResponse.json({
      data: newVersion,
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
