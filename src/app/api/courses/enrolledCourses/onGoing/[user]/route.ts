import { connectToDB } from '@/lib/connectToMongoose';
import Course from '@/lib/models/course.model';
import CourseTopic from '@/lib/models/courseTopic.model';
import { EnrollState } from '@/lib/models/enrollState.model';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

interface IParams {
  params: {
    user: string;
  };
}

export const GET = async (req: NextRequest, { params }: IParams) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized: Login required' },
      { status: 401 }
    );
  }

  if (!params?.user) {
    return NextResponse.json(
      { message: 'Bad Request: Missing user param' },
      { status: 400 }
    );
  }

  try {
    await connectToDB();

    const enrollStates = await EnrollState.find({ user: params.user })
      .populate({
        path: 'currentTopic',
        model: CourseTopic,
        select:
          'versions.type versions.data.title versions.data.description versions.data.source versions.data.duration',
      })
      .limit(10)
      .lean();

    if (!enrollStates.length) {
      return NextResponse.json({ data: [] });
    }

    const activeStates = [];
    for (const es of enrollStates) {
      const course = await Course.findById(es.course).lean();

      if (
        course &&
        !Array.isArray(course) &&
        course?.topics?.length &&
        es.finishedTopics?.length >= 0 &&
        course.topics.length > es.finishedTopics.length
      ) {
        activeStates.push({
          course: course,
          currentTopic: es.currentTopic,
          completedTopic: es.finishedTopics.length,
        });
      }
    }

    return NextResponse.json({ data: activeStates });
  } catch (error) {
    console.error('Error fetching enroll state:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
