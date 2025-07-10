import { connectToDB } from '@/lib/connectToMongoose';
import Course from '@/lib/models/course.model';
import CourseTopic from '@/lib/models/courseTopic.model';
import { EnrollState } from '@/lib/models/enrollState.model';
import { ICourse } from '@/types/course';
import { ICourseTopic } from '@/types/courseTopic';
import { NextRequest, NextResponse } from 'next/server';

interface IParams {
  params: {
    user: string;
  };
}

export const GET = async (req: NextRequest, { params }: IParams) => {
  try {
    await connectToDB();

    const enrollStates = await EnrollState.find({ user: params.user })
      .populate({
        path: 'currentTopic',
        model: CourseTopic,
        select:
          'versions.type versions.data.title versions.data.description versions.data.source versions.data.duration',
      })
      .limit(10);

    if (!enrollStates || enrollStates.length === 0) {
      return NextResponse.json({
        data: [],
      });
    }

    const state: {
      course: ICourse;
      currentTopic: ICourseTopic;
      completedTopic: number;
    }[] = [];

    for (const es of enrollStates) {
      const courseResult = await Course.findById(es.course).lean();
      const course = Array.isArray(courseResult)
        ? courseResult[0]
        : courseResult;

      if (
        course &&
        course.topics &&
        course.topics.length === es.finishedTopics.length
      ) {
        state.push({
          course: course as ICourse,
          currentTopic: es.currentTopic,
          completedTopic: es.finishedTopics.length,
        });
      }
    }

    return NextResponse.json({
      data: state,
    });
  } catch (error) {
    console.error('Error fetching enroll states:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
