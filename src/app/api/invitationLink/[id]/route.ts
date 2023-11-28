import { connectToRedis } from "@/lib/connectToRedis";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface PageParams {
  params: {
    id: string;
  };
}

export const GET = async (req: NextRequest, { params }: PageParams) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized: Login required",
    });
  }

  const redis = connectToRedis();
  const data = await redis.get(params.id);
  if (data) {
    return NextResponse.json({ data, message: null, status: 200 });
  }

  return NextResponse.json({
    status: 404,
    message: "Invitation link is expired",
    data: null,
  });
};
