import { connectToRedis } from "@/lib/connectToRedis";
import { mainEndPoint } from "@/utils/apiEndpoints";
import currentLocalTime from "@/utils/currentLocalTime";
import { nanoid } from "nanoid";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized: Login required",
    });
  }

  try {
    const payload = await req.json();

    const {
      creator,
      courseSlug,
      expiresIn,
      maxCapacity,
      banner,
      courseId,
      courseTitle,
    } = payload;

    const redis = connectToRedis();

    const code = "IN-" + nanoid(5).toUpperCase();

    const data = {
      creator,
      link: `${mainEndPoint}/course-landing/${courseSlug}`,
      banner,
      createdAt: currentLocalTime(),
      expiresIn,
      courseId,
      courseTitle,
      maxCapacity,
    };

    await redis.set(code, data, {
      ex: 60 * 24 * expiresIn, // min * hours * day
    });

    return NextResponse.json({ data, code, status: 201 });
  } catch {
    return NextResponse.json({
      data: null,
      message: "Something went wrong, please try again later",
      status: 505,
    });
  }
};
