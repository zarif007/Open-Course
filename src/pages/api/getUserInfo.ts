import { clerkClient } from "@clerk/nextjs";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const config = {
    runtime: "edge",
};

const handler: NextApiHandler = async (req: NextApiRequest) => {
    const { searchParams } = new URL(req.url || "");
    const userId = searchParams.get("userId");
    const user = await clerkClient.users.getUser(userId || '')
    return NextResponse.json({ user })
};

export default handler;
