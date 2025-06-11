import React from 'react';
import SocialMediaLogoBar from './SocialMediaLogo.Bar';
import NotifyBar from './Notify.Bar';
import LargeHeading from '../ui/LargeHeading';
import TextAppearAnimation from '../ui/TextAppearAnimation';
import CourseCategoriesRotation from './CourseCategoriesRotation';
import Link from 'next/link';
import { RocketIcon, GraduationCapIcon } from 'lucide-react';
import GridPattern from '../ui/animation/GridPattern';
import StarOnGithub from './StarOnGithub';
import StatsSummary from './StatsSummary';

const LandingPage = () => {
  return (
    <main className="relative h-screen max-h-full flex items-center justify-center overflow-x-hidden mb-4 mt-8 md:my-24">
      <div className="absolute inset-0 z-0 hidden md:block">
        <GridPattern strokeDasharray={'4 2'} numSquares={15} />
      </div>

      <div className="absolute inset-0 z-0 md:hidden">
        <GridPattern strokeDasharray={'4 2'} numSquares={6} />
      </div>
      <div className="container my-auto max-w-7xl w-full h-full z-10">
        <div className="h-full gap-4 flex flex-col justify-center items-center">
          <SocialMediaLogoBar />
          <div className="w-full flex justify-center items-center px-2">
            <NotifyBar
              text={
                <span>
                  🤖 AI Course Creation! It’s here,&nbsp;
                  <Link
                    href="/ai/course-creation"
                    className="text-blue-500 font-semibold hover:text-blue-600"
                  >
                    Create →
                  </Link>
                </span>
              }
            />
          </div>
          <StarOnGithub />
          <LargeHeading size="lg" className="three-d text-center">
            <span
              className="tw-gradient-text"
              data-testid="cy-join-landing-title"
            >
              Join any Course
            </span>{' '}
            <br />
            <TextAppearAnimation text="All for Free" />
            <div
              className=""
              style={{
                borderTop: '2px dashed #f43f5e',
                margin: '12px 0',
              }}
            />
            <span
              className="tw-gradient-text"
              data-testid="cy-create-landing-title"
            >
              Curate, Create & Share
            </span>{' '}
            <br />
          </LargeHeading>
          <CourseCategoriesRotation />
          <div className="flex flex-wrap gap-4 justify-center items-center mt-4">
            <Link
              href="/course-creation"
              className="px-6 py-3 rounded-md bg-rose-500 text-white text-lg font-semibold shadow hover:bg-rose-600 transition-colors flex items-center gap-2"
            >
              <RocketIcon className="w-5 h-5" />
              Create
            </Link>
            <Link
              href="/courses"
              className="px-6 py-3 rounded-md border-2 border-rose-500 text-rose-500 text-lg font-semibold hover:bg-rose-50 dark:hover:bg-[#2a2a2a] transition-colors flex items-center gap-2"
            >
              <GraduationCapIcon className="w-5 h-5" />
              Enroll
            </Link>
          </div>
          <StatsSummary />
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
