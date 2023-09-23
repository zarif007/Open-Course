import { connectToDB } from "@/lib/connectToMongoose";
import Course from "@/lib/models/course.model";
import CourseTopic from "@/lib/models/courseTopic.model";
import { EnrollState } from "@/lib/models/enrollState.model";
import { IEnrollState } from "@/types/enrollState";
import { startSession } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  connectToDB();

  const user = req.nextUrl.searchParams.get("user");
  const course = req.nextUrl.searchParams.get("course");

  const enrollState = await EnrollState.findOne({ user, course }).populate({
    path: "currentTopic",
    model: CourseTopic,
  });

  return NextResponse.json({ data: enrollState });
};

export const POST = async (req: NextRequest) => {
  connectToDB();

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
      { _id: course?._id },
      { $push: { enrolledUsers: payload.user } },
      { session, new: true }
    );

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
  connectToDB();

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
