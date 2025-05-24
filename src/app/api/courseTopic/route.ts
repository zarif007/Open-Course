import { connectToDB } from '@/lib/connectToMongoose';
import CourseTopic from '@/lib/models/courseTopic.model';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: 'Unauthorized: Login required',
    });
  }

  await connectToDB();

  const topics = await CourseTopic.find({});

  return NextResponse.json({ topics });
};

export const PUT = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: 'Unauthorized: Login required',
    });
  }

  try {
    await connectToDB();

    const body = await req.json();
    const { _id, ...updates } = body;

    if (!_id) {
      return NextResponse.json({
        status: 400,
        message: 'Missing course topic ID',
      });
    }

    const updatedTopic = await CourseTopic.findByIdAndUpdate(_id, updates, {
      new: true,
    });

    if (!updatedTopic) {
      return NextResponse.json({
        status: 404,
        message: 'Course topic not found',
      });
    }

    return NextResponse.json({ topic: updatedTopic });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: 'Server error',
      error: (error as Error).message,
    });
  }
};
