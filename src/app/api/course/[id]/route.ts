import { connectToDB } from '@/lib/connectToMongoose';
import Course from '@/lib/models/course.model';
import CourseTopic from '@/lib/models/courseTopic.model';
import User from '@/lib/models/user.model';
import { ICourseTopic } from '@/types/courseTopic';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/options';

interface IParams {
  params: {
    id: string;
  };
}

export const revalidate = true;

export const PUT = async (req: NextRequest, { params }: IParams) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: 'Unauthorized: Login required',
    });
  }

  await connectToDB();

  const id = params.id;

  const payload = await req.json();

  // Fetch user from db using id and get the email
  // Validate if user.email === token.email

  const requestedUser = await User.findOne({ email: token.email }).select(
    '_id'
  );

  if (requestedUser._id !== payload.creator) {
    return NextResponse.json({
      status: 401,
      message: 'Unauthorized to do this action',
      success: false,
    });
  }

  const topics: ICourseTopic[] = [];

  // Creating or Updating topics and storing at the course
  for (const topic of payload.topics) {
    let res = topic;
    if (topic._id === '') {
      res = await CourseTopic.create({
        versions: topic.versions,
        topicID: topic.topicID,
        sortID: topic.sortID,
      });
    } else {
      res = await CourseTopic.findOneAndUpdate({ _id: topic._id }, topic, {
        new: true,
      });
    }
    topics.push(res);
  }

  const course = await Course.findByIdAndUpdate(
    { _id: id },
    {
      ...payload,
      topics: topics,
    },
    { new: true }
  );

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

  revalidatePath(`/course/${payload.slug}`);

  return NextResponse.json({ data: course, success: false, status: 201 });
};
