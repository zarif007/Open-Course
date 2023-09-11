import { connectToDB } from "@/lib/connectToMongoose";
import Course from "@/lib/models/course.model";
import CourseTopic from "@/lib/models/courseTopic.model";
import User from "@/lib/models/user.model";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  connectToDB();

  const payload = await req.json();

  const topicIds: Types.ObjectId[] = [];

  // Creating topics and storing _ids at the course
  for (const topic of payload.topics) {
    const res = await CourseTopic.create(topic);
    topicIds.push(new Types.ObjectId(res._id.toString()));
  }

  const course = await Course.create({
    ...payload,
    topics: topicIds,
  });

  await course.populate({
    path: "topics",
    model: CourseTopic,
  });

  await course.populate({
    path: "creator",
    model: User,
  });

  return NextResponse.json({ data: course });
};
