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
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          <svg
            width="75"
            viewBox="0 0 75 65"
            fill="#000"
            style={{ margin: "0 75px" }}
          >
            <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
          </svg>
          <div style={{ marginTop: 40, fontSize: 60, fontWeight: 1000 }}>
            {courseName}
          </div>
          <p>By {creator}</p>
          <p>{topics}</p>
        </div>
      ),
      {
        width: 1200,
        height: 600,
      }
    );
  } catch {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
};

export default handler;
