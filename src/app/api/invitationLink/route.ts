import { connectToRedis } from "@/lib/connectToRedis";
import { mainEndPoint } from "@/utils/apiEndpoints";
import currentLocalTime from "@/utils/currentLocalTime";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const payload = await req.json();

  const { creator, courseSlug } = payload;

  //   `${mainEndPoint}/course-landing/${courseSlug}`

  const redis = connectToRedis();
  // const userFromRedis = await redis.get(email);
  // if (userFromRedis) {
  //   return NextResponse.json({ data: userFromRedis });
  // }

  const code = nanoid(5).toUpperCase();

  const data = {
    creator: creator,
    link: `${mainEndPoint}/i/${code}`,
    createdAt: currentLocalTime(),
    expiresIn: 7,
  };

  await redis.set(`${creator}-${courseSlug}`, data, {
    ex: 60,
  });

  return NextResponse.json({ data });
};
