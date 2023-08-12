import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

const handler = async (req: Request) => {
  const { searchParams } = new URL(req.url || "");
  const userId = searchParams.get("userId") || "";

  const user = await prisma.user.findFirst({
    where: {
      externalId: userId,
    },
  });
  if (!user) return NextResponse.json({}, { status: 500 });

  return NextResponse.json({ user: user.attributes });
};

export const GET = handler;
