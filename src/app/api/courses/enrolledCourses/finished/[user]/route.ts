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
  await connectToDB();

  const enrollStates = await EnrollState.find({ user: params.user })
    .populate({
      path: 'currentTopic',
      model: CourseTopic,
      select:
        'versions.type versions.data.title versions.data.description versions.data.source versions.data.duration',
    })
    .populate({
      path: 'course',
      model: Course,
    })
    .limit(10);

  if (!enrollStates) {
    return NextResponse.json({
      data: [],
    });
  }

  const state: {
    course: ICourse;
    currentTopic: ICourseTopic;
    completedTopic: number;
  }[] = [];

  enrollStates.map((es) => {
    if (es.course.topics.length === es.finishedTopics.length) {
      state.push({
        course: es.course,
        currentTopic: es.currentTopic,
        completedTopic: es.finishedTopics.length,
      });
    }
  });

  return NextResponse.json({
    data: state,
  });
};
