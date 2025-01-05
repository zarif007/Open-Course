'use client';

import React from 'react';
import LargeHeading from '../ui/LargeHeading';
import HyperText from '../ui/HyperText';

const RoadmapLanding = () => {
  return (
    <main className="relative h-60 flex flex-col items-center justify-start overflow-x-hidden mx-auto">
      <HyperText text="Road Maps" className="underline decoration-rose-500" />
      <LargeHeading className="" size="sm">
        Coming Soon...
      </LargeHeading>
    </main>
  );
};

export default RoadmapLanding;
