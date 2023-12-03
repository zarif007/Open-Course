import { connectToDB } from "@/lib/connectToMongoose";
import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({
        data: null,
        status: 400,
        success: false,
        message: "Invalid data",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        data: null,
        status: 400,
        success: false,
        message: "User does not exits with this email",
      });
    }

    const passwordMatched = await bcrypt.compare(password ?? "", user.password);

    if (!passwordMatched) {
      return NextResponse.json({
        data: null,
        status: 400,
        success: false,
        message: "Invalid password, try again",
      });
    }

    return NextResponse.json({ data: user, status: 200, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      data: null,
      status: 400,
      success: false,
      message: "Something went wrong",
    });
  }
};
