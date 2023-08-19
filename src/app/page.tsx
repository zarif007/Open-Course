"use client";

import Courses from "@/components/Courses";
import IntroPage from "@/components/Intro.Page";
import LandingPage from "@/components/Landing.Page";


export default function Home() {
  return (
    <div className="mb-12">
      <LandingPage />

      <HorizontalLine />
      <IntroPage />
      <HorizontalLine />
      <Courses />
    </div>
  );
}

const HorizontalLine = () => {
  return (
    <div
      className="mb-12 md:mb-24 w-full max-w-5xl mx-auto"
      style={{
        borderTop: "2px dashed #f43f5e",
      }}
    />
  );
};
