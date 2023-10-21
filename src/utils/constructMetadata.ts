import { Metadata } from "next";

const constructMetadata = ({
  title = "Open Course - Free Courses",
  description = "Create and Enroll free Courses",
  image = "/whatisit-dark.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@zarifXD",
    },
    icons,
    metadataBase: new URL("https://open-course.vercel.app"),
    themeColor: "#FFF",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
};

export default constructMetadata;
