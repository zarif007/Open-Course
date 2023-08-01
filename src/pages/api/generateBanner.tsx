import { ImageResponse } from "@vercel/og";
import { NextApiHandler, NextApiRequest } from "next";

export const config = {
  runtime: "edge",
};

const handler: NextApiHandler = async (req: NextApiRequest) => {
  const { searchParams } = new URL(req.url || "");
  const courseName = searchParams.get("courseName");
  const creator = searchParams.get("creator");
  const topics = searchParams.get("topics");
  const imgUrl = searchParams.get("imgUrl");
  try {
    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-gray-950 border-2 border-slate-100">
          <div tw=" flex w-full">
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left text-slate-100">
                <span tw="text-6xl truncate max-w-[80%]">{courseName}</span>
                <span tw="text-rose-600">by {creator}</span>
                <span tw="truncate text-sm">{topics}</span>

              </h2>
              <div tw="mt-8 flex md:mt-0">
                <img src={imgUrl || ''} alt="ff" tw="h-40 w-40 rounded" />
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 300,
      }
    );
  } catch {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
};

export default handler;
