import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const payload = await req.json();

  //   `${mainEndPoint}/course-landing/${courseSlug}`

  // const redis = connectToRedis();
  // const userFromRedis = await redis.get(email);
  // if (userFromRedis) {
  //   return NextResponse.json({ data: userFromRedis });
  // }
  // redis.set(email, user);

  return NextResponse.json({ link: "" });
};
