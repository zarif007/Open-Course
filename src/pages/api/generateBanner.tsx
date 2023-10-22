import { ImageResponse } from "@vercel/og";
import { NextApiHandler, NextApiRequest } from "next";
import { useEffect } from "react";

export const config = {
  runtime: "edge",
};

const handler: NextApiHandler = async (req: NextApiRequest) => {
  const BebasNeueRegular = await fetch(
    new URL("../../../public/BebasNeue-Regular.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const { searchParams } = new URL(req.url || "");
  const courseTitle = searchParams.get("courseTitle");
  const slug = searchParams.get("slug");

  const creator = searchParams.get("creator");
  const topics = searchParams.get("topics");
  const imgUrl = searchParams.get("imgUrl");

  try {
    const constructImage = new ImageResponse(
      (
        <div
          tw={`h-full w-full flex items-start justify-start
          border-8 border-rose-500 rounded bg-[#030712]`}
        >
          <div tw="flex items-start justify-start h-full">
            <div tw="flex flex-col justify-center items-center px-20 w-full h-full text-center">
              <h1 tw={`text-[40px] text-slate-100`} style={{ fontWeight: 900 }}>
                Open Course
              </h1>

              <h1 tw="text-[60px] text-rose-500" style={{ fontWeight: 1200 }}>
                {courseTitle}
              </h1>

              <p
                tw={`text-[60px] text-slate-100 mx-auto text-center font-bold mb-0`}
              >
                {topics}
              </p>

              <div tw="flex space-x-4 items-center justify-between mt-2">
                <p tw="text-[50px] text-rose-500 mx-auto text-center font-bold mb-0">
                  {creator}
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1600,
        height: 800,
        fonts: [
          {
            name: "Inter",
            data: BebasNeueRegular,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );

    return constructImage;
  } catch {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
};

export default handler;
