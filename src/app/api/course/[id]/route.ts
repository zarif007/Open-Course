import { connectToDB } from "@/lib/connectToMongoose";
import Course from "@/lib/models/course.model";
import CourseTopic from "@/lib/models/courseTopic.model";
import User from "@/lib/models/user.model";
import { ICourseTopic } from "@/types/courseTopic";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface PageParams {
  params: {
    id: string;
  };
}

export const revalidate = true;

export const PUT = async (req: NextRequest, { params }: PageParams) => {
  connectToDB();

  const id = params.id;
  const payload = await req.json();

  const topics: ICourseTopic[] = [];

  // Creating or Updating topics and storing at the course
  for (const topic of payload.topics) {
    let res = topic;
    if (topic._id === "") {
      res = await CourseTopic.create({
        versions: topic.versions,
        topicID: topic.topicID,
      });
    } else {
      res = await CourseTopic.findOneAndUpdate({ _id: topic._id }, topic, {
        new: true,
      });
    }
    topics.push(res);
  }

  const course = await Course.findByIdAndUpdate(
    { _id: id },
    {
      ...payload,
      topics: topics,
    },
    { new: true }
  );

  if (course) {
    await course.populate({
      path: "topics",
      model: CourseTopic,
    });

    await course.populate({
      path: "creator",
      model: User,
    });
  }

  revalidatePath(`/course/${payload.slug}`);

  return NextResponse.json({ data: course });
};
