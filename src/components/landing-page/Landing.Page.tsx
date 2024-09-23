import React from 'react';
import SocialMediaLogoBar from './SocialMediaLogo.Bar';
import NotifyBar from './Notify.Bar';
import LargeHeading from '../ui/LargeHeading';
import TextAppearAnimation from '../ui/TextAppearAnimation';
import CourseCategoriesRotation from './CourseCategoriesRotation';
import Link from 'next/link';
import { buttonVariants } from '../ui/Button';
import Image from 'next/image';
import StarOnGithub from './StarOnGithub';

const LandingPage = () => {
  return (
    <main className="relative h-screen flex items-center justify-center overflow-x-hidden mb-4 mt-8 md:mb-12 md:mt-12 dark:bg-grid-small-white/[0.1] bg-grid-small-black/[0.1]">
      <div className="container my-auto max-w-7xl w-full h-full ">
        <div className="h-full gap-4 flex flex-col justify-center items-center ">
          <SocialMediaLogoBar />
          <div className="w-full flex justify-center items-center px-2">
            <NotifyBar text="🤖 AI Course Creation! Coming Soon ⌛" />
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
