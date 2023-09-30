import { prisma } from "@/lib/db";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const handler: NextApiHandler = async (req: NextApiRequest) => {
  const { searchParams } = new URL(req.url || "");
  const userId = searchParams.get("userId") || "";
  const user = await prisma.user.findFirst({
    where: {
      externalId: userId,
    },
  });
  return NextResponse.json({ user });
};

export default handler;
