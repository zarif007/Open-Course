import { prisma } from "@/lib/db";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { searchParams } = new URL(req.url || "");
    const userId = searchParams.get("userId") || '';

    const user = await prisma.user.findFirst({
        where: {
            externalId: userId,
        },
    })
    if (!user)
      return res.statusCode = 500;

    return NextResponse.json({ user: user.attributes })
};

export const GET = handler