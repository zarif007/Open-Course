import { connectToDB } from '@/lib/connectToMongoose';
import Course from '@/lib/models/course.model';
import { NextResponse } from 'next/server';
import { Types } from 'mongoose';

interface PageParams {
  params: {
    id: string;
  };
}

export const GET = async (req: Request, { params }: PageParams) => {
  const { id } = params;
  await connectToDB();

  try {
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const [createdCoursesCount, completedCoursesCount] = await Promise.all([
      Course.countDocuments({ creator: id }),
      Promise.resolve(0),
    ]);

    return NextResponse.json({
      createdCoursesCount,
      completedCoursesCount,
    });
  } catch (error) {
    console.error('Error fetching course counts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
