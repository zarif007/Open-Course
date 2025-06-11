'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import Paragraph from '../ui/Paragraph';
import { Button } from '../ui/Button';
import LandingPageFigureBeam from './LandingPageFigure.Beam';
import HyperText from '../ui/HyperText';

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="text-rose-500 font-semibold">{children}</span>
);

const IntroPage = () => {
  const { theme } = useTheme();

  return (
    <main className="flex flex-col items-center justify-center max-w-3xl mx-auto px-6 py-12 space-y-10 overflow-x-hidden select-none">
      <HyperText
        text="What is It?"
        className="text-3xl font-bold underline underline-offset-4 decoration-rose-500"
      />

      <figure className="text-center max-w-3xl">
        <blockquote>
          <Paragraph className="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
            A <Highlight>community driven platform</Highlight> where users can{' '}
            <Highlight>create courses</Highlight> on a topic by collecting{' '}
            <Highlight>free contents</Highlight> from the internet and arranging
            them in a <Highlight>sequential manner</Highlight> to share with
            others <Highlight>for free.</Highlight>
          </Paragraph>
        </blockquote>
        <figcaption className="mt-6 text-sm font-medium text-gray-600 dark:text-gray-400">
          —{' '}
          <a
            href="https://www.linkedin.com/in/md-zarif-ul-huq/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-500 underline underline-offset-2 transition"
          >
            Zarif
          </a>
          , Creator
        </figcaption>
      </figure>

      <LandingPageFigureBeam />

      <Button
        variant="generalRose"
        className="px-10 py-3 rounded-md font-semibold text-white bg-rose-500 hover:bg-rose-600 focus:ring-0 focus:outline-none transition-colors"
      >
        Watch a Video?
      </Button>
    </main>
  );
};

export default IntroPage;
