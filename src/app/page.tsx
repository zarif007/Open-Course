"use client";
import { buttonVariants } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import Link from "next/link";
import NotifyBar from "@/components/Notify.Bar";
import CourseRotation from "@/components/CourseRotation";
import SocialMediaLogoBar from "@/components/SocialMediaLogo.Bar";
import TextAppearAnimation from "@/components/ui/TextAppearAnimation";

export default function Home() {
  return (
    <main className="relative h-screen flex items-center justify-center overflow-x-hidden mb-4 md:mb-12 ">
      <div className="container pt-12 max-w-7xl w-full  h-full ">
        <div className="h-full gap-6 flex flex-col justify-center items-center ">
          <SocialMediaLogoBar />
          <NotifyBar text="🤖 Create Courses with the Power of AI 🤖" />
          <LargeHeading size="lg" className="three-d text-center ">
            <span className="tw-gradient-text">Join any Course</span> <br />
            <TextAppearAnimation text="All for Free" />
            <div
              className="shadow-[7px_18px_67px_64px_rgba(202,_54,_80,_0.18)]"
              style={{
                borderTop: "2px dashed #f97316",
                margin: "12px 0",
              }}
            />
            <span className="tw-gradient-text">Curate, Create & Share</span> <br />
          </LargeHeading>
          <CourseRotation />
          <div className="flex space-x-4 flex-wrap justify-center items-center">
            <Link
              href="/course-creation"
              className={`${buttonVariants({
                variant: "bigButton",
              })} mt-4 bg-[#0c10ed]`}
            >
              <span className="font-semibold">Create</span>
            </Link>
            <Link
              href="/documentation"
              className={`${buttonVariants({
                variant: "bigButtonOutline",
              })} mt-4`}
            >
              <span className="font-semibold">Enroll</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
