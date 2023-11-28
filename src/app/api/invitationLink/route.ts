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

  // client.set('myKey', 'newValue', 'KEEPTTL');

  const data = {
    creator: creator,
    link: `${mainEndPoint}/course-landing/${courseSlug}`,
    message: "Invited to join " + courseSlug,
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
};
