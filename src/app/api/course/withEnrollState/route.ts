import { connectToDB } from '@/lib/connectToMongoose';
import Course from '@/lib/models/course.model';
import CourseTopic from '@/lib/models/courseTopic.model';
import { EnrollState } from '@/lib/models/enrollState.model';
import User from '@/lib/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const userEmail = req.nextUrl.searchParams.get('userEmail');
    const courseSlug = req.nextUrl.searchParams.get('courseSlug');

    if (!courseSlug) {
      return NextResponse.json({
        course: null,
        enrollState: null,
        success: false,
      });
    }

    let userId = null;

    if (userEmail) {
      const user = await User.findOne({ email: userEmail });
      userId = user?._id;
    }

    const course = await Course.findOne({ slug: courseSlug })
      .populate({
        path: 'topics',
        model: CourseTopic,
        select:
          'topicID sortID views versions.type versions.data.title versions.data.description versions.data.source versions.data.duration',
      })
      .populate({
        path: 'creator',
        model: User,
        select: 'name image userName email',
      })
      .populate({
        path: 'reviews.user',
        model: User,
        select: 'name image userName',
      });

    let enrollState = null;

    if (userId) {
      enrollState = await EnrollState.findOne({
        user: userId,
        course,
      }).populate({
        path: 'currentTopic',
        model: CourseTopic,
      });
    }

    return NextResponse.json({ course, enrollState, success: true });
  } catch {
    return NextResponse.json({
      course: null,
      enrollState: null,
      success: false,
    });
  }
};
