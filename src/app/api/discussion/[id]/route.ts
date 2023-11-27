import { connectToDB } from "@/lib/connectToMongoose";
import Discussion from "@/lib/models/discussion.model";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface PageParams {
  params: {
    id: string;
  };
}

export const DELETE = async (req: NextRequest, { params }: PageParams) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized: Login required",
    });
  }
  await connectToDB();

  const id = params.id;
  await Discussion.findByIdAndDelete(id);

  return NextResponse.json({ data: null });
};

export const PUT = async (req: NextRequest, { params }: PageParams) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized: Login required",
    });
  }
  await connectToDB();

  const payload = await req.json();

  const id = params.id;
  try {
    const discuss = await Discussion.findByIdAndUpdate(id, payload, {
      new: true,
    });

    return NextResponse.json({ data: discuss });
  } catch (error) {
    return NextResponse.json({ data: null });
  }
};
