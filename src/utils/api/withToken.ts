import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { connectToDB } from "@/lib/connectToMongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface PageParams {
  params: {
    slug: string;
  };
}

const withToken = async (
  handler: (req: NextRequest, { params }: PageParams) => Promise<NextResponse>
) => {
  return async (req: NextRequest, { params }: PageParams) => {
    console.log(handler);
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({
        status: 401,
        message: "Unauthorized: Login required",
        data: null,
      });
    }

    await connectToDB();

    return await handler(req, { params });
  };
};

export default withToken;
