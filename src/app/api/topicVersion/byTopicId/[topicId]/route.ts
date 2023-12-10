import { connectToDB } from '@/lib/connectToMongoose';
import TopicVersion from '@/lib/models/topicVersion.model';
import User from '@/lib/models/user.model';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

interface PageParams {
  params: {
    topicId: string;
  };
}

export const GET = async (
  req: NextRequest,
  { params }: PageParams
): Promise<NextResponse> => {
  try {
    const topicId = params.topicId;

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

    const versions = await TopicVersion.find({ topicId }).populate({
      path: 'creator',
      model: User,
      select: 'name image userName',
    });

    return NextResponse.json({ status: 200, data: versions, success: true });
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
