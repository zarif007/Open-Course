"use client";
import { buttonVariants } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Home() {
  const { setTheme } = useTheme();
  return (
    <main className="relative h-screen flex items-center justify-center overflow-x-hidden my-8 md:my-24">
      <div className="container pt-12 max-w-7xl w-full  h-full">
        <div className="h-full gap-6 flex flex-col justify-center items-center">
          <LargeHeading size="lg" className="three-d text-center ">
            <span className="gradient-text">Join any Course</span> <br />
            All for Free
            <div
              style={{
                borderTop: "2px dashed #64748b",
                margin: "12px 0",
              }}
            />
            <span className="gradient-text">Curate, Create & Share</span> <br />
          </LargeHeading>

          {/* <Paragraph className="mx-auto">
            Define Schema, Select data type, Click generate, Get API endpoint{" "}
            <br />
          </Paragraph> */}
          <div className="flex space-x-4 flex-wrap justify-center items-center">
            <Link
              href="/dashboard"
              className={`${buttonVariants({ variant: "bigButton" })} mt-4`}
            >
              <span className="font-semibold">Create</span>
            </Link>
            <Link
              href="/documentation"
              className={`${buttonVariants({
                variant: "bigButton",
              })} mt-4`}
            >
              <span className="font-semibold">Enroll</span>
            </Link>
          </div>

          {/* <Image
            priority
            className="md:h-96 md:w-96 h-72 w-72 rounded"
            quality={100}
            style={{ objectFit: "contain" }}
            src="https://i.ibb.co/wscTzzN/banner.gif"
            alt="banner"
            height="50"
            width="50"
          /> */}
        </div>
      </div>
    </main>
  );
}
