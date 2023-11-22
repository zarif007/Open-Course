import { connectToDB } from "@/lib/connectToMongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  await connectToDB();

  // const course = await Course.findById(id)
  //   .populate({
  //     path: "topics",
  //     model: CourseTopic,
  //   })
  //   .populate({
  //     path: "creator",
  //     model: User,
  //   });

  return NextResponse.json({ data: null });
};
