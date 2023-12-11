import { connectToDB } from '@/lib/connectToMongoose';
import Course from '@/lib/models/course.model';
import CourseTopic from '@/lib/models/courseTopic.model';
import User from '@/lib/models/user.model';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

interface PageParams {
  params: {
    slug: string;
  };
}

export const GET = async (
  req: NextRequest,
  { params }: PageParams
): Promise<NextResponse> => {
  try {
    const slug = params.slug;

    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({
        status: 401,
        message: 'Unauthorized: Login required!!!',
        data: null,
        success: false,
      });
    }

    await connectToDB();

    const course = await Course.findOne({ slug })
      .populate({
        path: 'topics',
        model: CourseTopic,
      })
      .populate({
        path: 'creator',
        model: User,
        select: 'name image userName',
      })
      .populate({
        path: 'topics',
        model: CourseTopic,
        populate: {
          path: 'versions.creator',
          model: User,
          select: 'name image userName',
        },
      });

    return NextResponse.json({ status: 200, data: course, success: true });
  } catch (error) {
    let status = 500;
    let message = 'Internal server error';

    return NextResponse.json({
      data: null,
      status,
      message,
      success: false,
    });
  }
};
