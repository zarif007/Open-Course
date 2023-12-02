import { connectToDB } from "@/lib/connectToMongoose";
import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({
        data: null,
        status: 400,
        success: false,
        message: "Invalid data",
      });
    }

    const user = await User.findOne({ email }).select("_id");

    return NextResponse.json({ data: user });
  } catch {
    return NextResponse.json({
      data: null,
      status: 400,
      success: false,
      message: "Something went wrong",
    });
  }
};
