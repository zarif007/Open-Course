import { connectToDB } from "@/lib/connectToMongoose";
import User from "@/lib/models/user.model";
import registerInputsSchema from "@/validations/auth/register";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.json();

    const isValid = registerInputsSchema.safeParse(payload);

    if (!isValid.success) {
      return NextResponse.json({
        data: null,
        status: 400,
        success: false,
        message: "Invalid data",
      });
    }

    const { name, email, password } = payload;

    await connectToDB();

    const isExits = await User.findOne({ email }).select("_id");

    if (isExits) {
      return NextResponse.json({
        data: null,
        status: 400,
        success: false,
        message: "User with this email already exits",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 11);

    const user = await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({
      data: user,
      status: 201,
      success: true,
      message: "Created Successfully",
    });
  } catch {
    return NextResponse.json({
      data: null,
      status: 400,
      success: false,
      message: "Something went wrong",
    });
  }
};
