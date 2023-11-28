import { connectToRedis } from "@/lib/connectToRedis";
import { mainEndPoint } from "@/utils/apiEndpoints";
import currentLocalTime from "@/utils/currentLocalTime";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const payload = await req.json();

  const { creator, courseSlug, expiresIn, maxCapacity } = payload;

  const redis = connectToRedis();
  // const userFromRedis = await redis.get(email);
  // if (userFromRedis) {
  //   return NextResponse.json({ data: userFromRedis });
  // }

  const code = "IN-" + nanoid(5).toUpperCase();

  const data = {
    creator: creator,
    link: `${mainEndPoint}/course-landing/${courseSlug}`,
    createdAt: currentLocalTime(),
    expiresIn,
    maxCapacity,
  };

  await redis.set(code, data, {
    ex: 60 * 24 * expiresIn, // min * hours * day
  });

  return NextResponse.json({ data, code });
};
