import { connectToDB } from "@/lib/connectToMongoose";
import Course from "@/lib/models/course.model";
import CourseTopic from "@/lib/models/courseTopic.model";
import User from "@/lib/models/user.model";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  connectToDB();

  const payload = await req.json();
  console.log(payload);

  const topicIds: Types.ObjectId[] = [];

  // Creating topics and storing _ids at the course
  for (const topic of payload.topics) {
    const res = await CourseTopic.create(topic);
    topicIds.push(new Types.ObjectId(res._id.toString()));
  }

  const result = await Course.create({
    ...payload,
    topics: topicIds,
  });

  await result.populate({
    path: "topics",
    model: CourseTopic,
  });

  await result.populate({
    path: "creator",
    model: User,
  });

  return NextResponse.json({ data: result });
};
