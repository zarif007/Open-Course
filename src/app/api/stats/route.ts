import { connectToDB } from '@/lib/connectToMongoose';
import Course from '@/lib/models/course.model';
import { NextResponse } from 'next/server';

export const GET = async () => {
  await connectToDB();

  const totalCourses = await Course.countDocuments();

  const aiCourses = await Course.countDocuments({ isAIGenerated: true });

  const enrollmentAggregation = await Course.aggregate([
    {
      $project: {
        enrolledCount: { $size: '$enrolledUsers' },
      },
    },
    {
      $group: {
        _id: null,
        totalEnrollments: { $sum: '$enrolledCount' },
      },
    },
  ]);

  const totalEnrollments =
    enrollmentAggregation.length > 0
      ? enrollmentAggregation[0].totalEnrollments
      : 0;

  return NextResponse.json({
    totalCourses,
    aiCourses,
    totalEnrollments,
  });
};
