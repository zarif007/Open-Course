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

    const versions = await TopicVersion.find({
      topicId,
      stage: 'pending',
    }).populate({
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

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({
        status: 401,
        message: 'Unauthorized: Login required',
        data: null,
        success: false,
      });
    }

    await connectToDB();

    const body = await req.json();
    const { _id, ...updates } = body;

    if (!_id) {
      return NextResponse.json({
        status: 400,
        message: 'Missing TopicVersion ID',
        data: null,
        success: false,
      });
    }

    const updatedVersion = await TopicVersion.findByIdAndUpdate(_id, updates, {
      new: true,
    });

    if (!updatedVersion) {
      return NextResponse.json({
        status: 404,
        message: 'TopicVersion not found',
        data: null,
        success: false,
      });
    }

    return NextResponse.json({
      status: 200,
      message: 'TopicVersion updated successfully',
      data: updatedVersion,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: 'Internal server error',
      data: null,
      success: false,
    });
  }
};
