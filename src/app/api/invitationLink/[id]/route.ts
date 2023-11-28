import { connectToRedis } from "@/lib/connectToRedis";
import IInvitationLink from "@/types/invitationLink";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface PageParams {
  params: {
    id: string;
  };
}

export const GET = async (req: NextRequest, { params }: PageParams) => {
  const redis = connectToRedis();
  const data: IInvitationLink | null = await redis.get(params.id);
  if (data && data.maxCapacity > 0) {
    return NextResponse.json({ data, message: null, status: 200 });
  }

  return NextResponse.json({
    status: 404,
    message: "Invitation link is expired",
    data: null,
  });
};

export const PUT = async (req: NextRequest, { params }: PageParams) => {
  try {
    const redis = connectToRedis();

    const data: IInvitationLink | null = await redis.get(params.id);

    if (data) {
      const updated = {
        ...data,
        maxCapacity: data.maxCapacity - 1,
      };
      const currentTTL = await redis.ttl(params.id);

      redis.setex(params.id, currentTTL, updated);

      return NextResponse.json({ data: null, message: null, status: 201 });
    }

    return NextResponse.json({
      status: 404,
      message: "Invitation link is expired",
      data: null,
    });
  } catch {
    return NextResponse.json({
      data: null,
      message: "Something went wrong, please try again later",
      status: 505,
    });
  }
};
