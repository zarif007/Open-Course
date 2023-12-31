import { connectToDB } from '@/lib/connectToMongoose';
import Course from '@/lib/models/course.model';
import CourseTopic from '@/lib/models/courseTopic.model';
import User from '@/lib/models/user.model';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

interface PageParams {
  params: {
    id: string;
  };
}

export const PUT = async (req: NextRequest, { params }: PageParams) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: 'Unauthorized: Login required',
      success: false,
    });
  }

  await connectToDB();

  const id = params.id;
  const payload = await req.json();

  const course = await Course.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  if (course) {
    await course.populate({
      path: 'topics',
      model: CourseTopic,
    });

    await course.populate({
      path: 'creator',
      model: User,
    });
  }

  return NextResponse.json({ data: course, success: true });
};
