import { connectToDB } from '@/lib/connectToMongoose';
import CourseReview from '@/lib/models/courseReviews.model';
import { NextRequest, NextResponse } from 'next/server';

interface PageParams {
  params: {
    courseId: string;
  };
}

export const GET = async (req: NextRequest, { params }: PageParams) => {
  try {
    await connectToDB();

    const courseId = params.courseId;

    const courseReviews = await CourseReview.find({ courseId }).select(
      'rating'
    );

    return NextResponse.json({ data: courseReviews, success: true });
  } catch {
    return NextResponse.json({ data: [], success: false });
  }
};
