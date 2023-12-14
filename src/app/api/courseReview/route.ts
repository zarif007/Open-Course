import { connectToDB } from '@/lib/connectToMongoose';
import CourseReview from '@/lib/models/courseReviews.model';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: 'Unauthorized: Login required',
      success: false,
    });
  }

  await connectToDB();

  const payload = await req.json();

  const courseReview = await CourseReview.create(payload);

  return NextResponse.json({ data: courseReview, success: true });
};

export const GET = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: 'Unauthorized: Login required',
      success: false,
    });
  }

  const courseId = req.nextUrl.searchParams.get('courseId');
  const userId = req.nextUrl.searchParams.get('userId');

  if (!courseId || !userId) {
    return NextResponse.json({
      status: 404,
      message: 'Not found',
      success: false,
    });
  }

  await connectToDB();

  const courseReview = await CourseReview.findOne({ user: userId, courseId });

  return NextResponse.json({ data: courseReview, success: true });
};
