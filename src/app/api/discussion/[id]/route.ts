import { connectToDB } from "@/lib/connectToMongoose";
import Discussion from "@/lib/models/discussion.model";
import { NextRequest, NextResponse } from "next/server";

interface PageParams {
  params: {
    id: string;
  };
}
export const DELETE = async (req: NextRequest, { params }: PageParams) => {
  connectToDB();

  const id = params.id;
  await Discussion.findByIdAndDelete(id);

  return NextResponse.json({ data: null });
};
