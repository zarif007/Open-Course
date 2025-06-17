'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Paragraph from '../ui/Paragraph';
import { Button } from '../ui/Button';
import LandingPageFigureBeam from './LandingPageFigure.Beam';
import HyperText from '../ui/HyperText';
import { Safari } from '../ui/animation/Safari';

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="text-rose-500 font-semibold">{children}</span>
);

const IntroPage = () => {
  const { theme } = useTheme();
  const [selectedKey, setSelectedKey] = useState<string>('Course View');

  const imageMap: Record<string, { dark: string; light: string }> = {
    'Course View': {
      dark: 'https://i.postimg.cc/NMRFTrhh/screencapture-open-course-net-course-building-a-large-language-model-from-scratch-9d-STy-2025-06-15-2.png',
      light:
        'https://i.postimg.cc/HWVBGwGW/screencapture-open-course-net-course-building-a-large-language-model-from-scratch-9d-STy-2025-06-15-2.png',
    },
    'AI Ask': {
      dark: 'https://i.postimg.cc/GpzWQ3BK/Screenshot-2025-06-17-at-11-48-00-PM.png',
      light:
        'https://i.postimg.cc/vTpFVP1d/Screenshot-2025-06-17-at-11-47-17-PM.png',
    },
    Profile: {
      dark: 'https://i.postimg.cc/TYMThwn5/Screenshot-2025-06-17-at-11-50-42-PM.png',
      light:
        'https://i.postimg.cc/W4KQKWnq/Screenshot-2025-06-17-at-11-50-49-PM.png',
    },
    'AI Course Creation': {
      dark: 'https://i.postimg.cc/BQM24d1y/Screenshot-2025-06-17-at-11-42-23-PM.png',
      light:
        'https://i.postimg.cc/4dk9WGrK/Screenshot-2025-06-17-at-11-42-35-PM.png',
    },
  };

  const getImageForSafari = () => {
    const currentTheme = theme === 'dark' ? 'dark' : 'light';
    return (
      imageMap[selectedKey]?.[currentTheme] ||
      imageMap['Course View'][currentTheme]
    );
  };

  const selectImageForSafari = (key: string) => () => {
    setSelectedKey(key);
  };

  return (
    <main className="flex flex-col items-center justify-center max-w-6xl mx-auto px-6 pb-12 space-y-10 overflow-x-hidden select-none">
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
        <figcaption className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
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
      <Safari
        imageSrc={getImageForSafari()}
        mode="simple"
        url="https://www.open-course.net/"
        className="my-0"
      />
      <div className="flex flex-wrap mx-auto justify-center items-center">
        {['Course View', 'AI Course Creation', 'AI Ask', 'Profile'].map(
          (text, index) => (
            <Button
              key={index}
              size="sm"
              variant="outline"
              className="m-1"
              onClick={selectImageForSafari(text)}
            >
              {text}
            </Button>
          )
        )}
      </div>
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
