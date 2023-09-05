import { ImageResponse } from "@vercel/og";
import { NextApiHandler, NextApiRequest } from "next";

export const config = {
  runtime: "edge",
};

const handler: NextApiHandler = async (req: NextApiRequest) => {
  const BebasNeueRegular = await fetch(
    new URL("../../../public/BebasNeue-Regular.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const { searchParams } = new URL(req.url || "");
  const courseName = searchParams.get("courseName");

  const creator = searchParams.get("creator");
  const topics = searchParams.get("topics");
  const imgUrl = searchParams.get("imgUrl");

  const theme = searchParams.get("theme");
  try {
    return new ImageResponse(
      (
        <div
          tw={`h-full w-full flex items-start justify-start ${
            theme === "dark" ? "bg-[#121212]" : "bg-slate-100"
          }
          border-8 border-rose-500 rounded`}
        >
          <div tw="flex items-start justify-start h-full">
            <div tw="flex flex-col justify-center items-center px-20 w-full h-full text-center">
              <h1
                tw={`text-[40px] ${theme === "dark" ? "text-slate-100" : ""}`}
                style={{ fontWeight: 900 }}
              >
                Open Course
              </h1>

              <h1 tw="text-[60px] text-rose-500" style={{ fontWeight: 1200 }}>
                {courseName}
              </h1>

              <p
                tw={`text-[60px] ${
                  theme === "dark" ? "text-slate-100" : ""
                } mx-auto text-center font-bold mb-0`}
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
        width: 2000,
        height: 1000,
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
  } catch {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
};

export default handler;
