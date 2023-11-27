import { connectToDB } from "@/lib/connectToMongoose";
import Activity from "@/lib/models/activity.mode";
import Course from "@/lib/models/course.model";
import CourseTopic from "@/lib/models/courseTopic.model";
import { EnrollState } from "@/lib/models/enrollState.model";
import User from "@/lib/models/user.model";
import { IEnrollState } from "@/types/enrollState";
import getCurrentTime from "@/utils/getCurrentTime";
import { startSession } from "mongoose";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized: Login required",
    });
  }

  await connectToDB();

  const user = req.nextUrl.searchParams.get("user");
  const course = req.nextUrl.searchParams.get("course");

  const enrollState = await EnrollState.findOne({ user, course }).populate({
    path: "currentTopic",
    model: CourseTopic,
  });

  return NextResponse.json({ data: enrollState });
};

export const POST = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized: Login required",
    });
  }

  await connectToDB();

  const session = await startSession();
  try {
    session.startTransaction();
    const payload: IEnrollState = await req.json();

    const alreadyExists = await EnrollState.findOne({
      user: payload.user,
      course: payload.course,
    }).session(session);

    if (alreadyExists) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ data: null });
    }

    const course = await Course.findById(payload.course).session(session);

    if (!course) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ data: null });
    }

    const enrollState = await EnrollState.create(
      [
        {
          ...payload,
          currentTopic: course?.topics[0]._id,
        },
      ],
      { session }
    );

    await Course.updateOne(
      { _id: course._id },
      { $push: { enrolledUsers: payload.user } },
      { session, new: true }
    );

    await User.findOneAndUpdate({ _id: payload.user }, { $inc: { points: 2 } });

    const activity = new Activity({
      user: payload.user,
      date: getCurrentTime(),
      link: `/course/${course.slug}`,
      text: `Enrolled the course ${course.slug}`,
      type: "enrolled",
    });

    await activity.save({ session });

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({ data: enrollState });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json({ data: null });
  }
};

export const PUT = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized: Login required",
    });
  }

  await connectToDB();

  const payload: IEnrollState = await req.json();

  const enrollState = await EnrollState.findOneAndUpdate(
    { user: payload.user, course: payload.course },
    payload,
    {
      new: true,
    }
  );

  return NextResponse.json({ data: enrollState });
};
