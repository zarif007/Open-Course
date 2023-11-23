import { connectToDB } from "@/lib/connectToMongoose";
import Activity from "@/lib/models/activity.mode";
import Course from "@/lib/models/course.model";
import CourseTopic from "@/lib/models/courseTopic.model";
import User from "@/lib/models/user.model";
import getCurrentTime from "@/utils/getCurrentTime";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectToDB();

  const payload = await req.json();

  const topicIds: Types.ObjectId[] = [];

  // Creating topics and storing _ids at the course
  for (const topic of payload.topics) {
    const res = await CourseTopic.create({
      versions: topic.versions,
      topicID: topic.topicID,
      sortID: topic.sortID,
    });
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

  await User.findOneAndUpdate(
    { _id: payload.creator },
    { $inc: { points: 10 } }
  );

  await Activity.create({
    user: payload.creator,
    date: getCurrentTime(),
    link: `/course/${payload.slug}`,
    text: `Created the course ${payload.slug}`,
    type: "created",
  });

  return NextResponse.json({ data: course });
};
