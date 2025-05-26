import CoursesLanding from '@/components/landing-page/Courses.Landing';
import Footer from '@/components/landing-page/Footer';
import IntroPage from '@/components/landing-page/Intro.Page';
import LandingPage from '@/components/landing-page/Landing.Page';
import RoadmapLanding from '@/components/Roadmap/Roadmap.Landing';

export default function Home() {
  return (
    <div className="">
      <LandingPage />
      <HorizontalLine />
      <IntroPage />
      <HorizontalLine />
      <CoursesLanding />
      <HorizontalLine />
      <RoadmapLanding />
      <Footer />
    </div>
  );
}

const HorizontalLine = () => {
  return (
    <div
      className="mb-12 md:mb-24 w-full max-w-5xl mx-auto"
      style={{
        borderTop: '2px dashed #f43f5e',
      }}
    />
  );
};
