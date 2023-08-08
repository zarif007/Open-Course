"use client";

import Courses from "@/components/Courses";
import IntroPage from "@/components/Intro.Page";
import LandingPage from "@/components/Landing.Page";

export default function Home() {

  return (
    <div className="mb-12">
      <LandingPage />
      <IntroPage />
      <Courses />
    </div>
  );
}
