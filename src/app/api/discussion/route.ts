import { connectToDB } from '@/lib/connectToMongoose';
import Discussion from '@/lib/models/discussion.model';
import User from '@/lib/models/user.model';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const getDiscussions = async (
  version: number,
  topicId: string,
  parentId: string
) => {
  const discussions = await Discussion.find({
    version,
    topicId,
    parentId,
  })
    .populate({
      path: 'sender',
      model: User,
      select: 'name image userName email',
    })
    .populate({
      path: 'replies',
      model: Discussion,
    })
    .populate({
      path: 'replies',
      model: Discussion,
      populate: {
        path: 'sender',
        model: User,
        select: 'name image userName email',
      },
    })
    .populate({
      path: 'replies',
      model: Discussion,
      populate: {
        path: 'replies',
        model: Discussion,
      },
    })
    .populate({
      path: 'replies',
      model: Discussion,
      populate: {
        path: 'replies',
        model: Discussion,
        populate: {
          path: 'sender',
          model: User,
          select: 'name image userName email',
        },
      },
    })

    .sort({ createdAt: -1 });

  return discussions;
};

export const GET = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: 'Unauthorized: Login required',
    });
  }

  await connectToDB();

  const topicId = req.nextUrl.searchParams.get('topicId');
  const version = req.nextUrl.searchParams.get('version');
  const parentId = req.nextUrl.searchParams.get('parentId');

  if (!topicId || !version || !parentId) {
    return NextResponse.json({
      status: 404,
      message: 'Not found',
      data: [],
      success: false,
    });
  }

  const discussions = await getDiscussions(
    parseInt(version),
    topicId,
    parentId
  );

  return NextResponse.json({ data: discussions });
};

export const POST = async (req: NextRequest) => {
  try {
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

    const discussion = await Discussion.create(payload);

    if (discussion.parentId !== 'none') {
      await Discussion.updateOne(
        { _id: discussion.parentId },
        { $push: { replies: discussion.id } }
      );
    }
    await discussion.populate({
      path: 'sender',
      model: User,
      select: 'name image userName email',
    });

    return NextResponse.json({
      data: discussion,
      success: true,
      status: true,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Something went wrong!',
    });
  }
};
