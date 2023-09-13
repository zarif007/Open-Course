import CoursesLanding from "@/components/landing-page/Courses.Landing";
import IntroPage from "@/components/landing-page/Intro.Page";
import LandingPage from "@/components/landing-page/Landing.Page";

export default function Home() {
  return (
    <div className="mb-12">
      <LandingPage />

      <HorizontalLine />
      <IntroPage />
      <HorizontalLine />
      <CoursesLanding />
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
