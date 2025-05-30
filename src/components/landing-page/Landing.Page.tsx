import React from 'react';
import SocialMediaLogoBar from './SocialMediaLogo.Bar';
import NotifyBar from './Notify.Bar';
import LargeHeading from '../ui/LargeHeading';
import TextAppearAnimation from '../ui/TextAppearAnimation';
import CourseCategoriesRotation from './CourseCategoriesRotation';
import Link from 'next/link';
import { buttonVariants } from '../ui/Button';
import GridPattern from '../ui/animation/GridPattern';
import StarOnGithub from './StarOnGithub';

const LandingPage = () => {
  return (
    <main className="relative h-screen flex items-center justify-center overflow-x-hidden mb-4 mt-8 md:my-0">
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
          <div className="flex space-x-4 flex-wrap justify-center items-center">
            <Link
              href="/course-creation"
              className={`${buttonVariants({
                variant: 'bigButton',
              })} mt-4 bg-[#0c10ed]`}
            >
              <span className="font-semibold">Create</span>
            </Link>
            <Link
              href="/courses"
              className={`${buttonVariants({
                variant: 'bigButtonOutline',
              })} mt-4`}
            >
              <span className="font-semibold">Enroll</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
