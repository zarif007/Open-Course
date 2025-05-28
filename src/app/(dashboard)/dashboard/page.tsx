'use client';

import React from 'react';
import OngoingCourses from '@/components/dashboard/OngoingCourses';
import FinishedCourses from '@/components/dashboard/FinishedCourses';
import { useAppSelector } from '@/redux/store';

const Dashboard = () => {
  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  return (
    <div className="w-full max-w-6xl px-6 py-12 mx-auto space-y-12">
      <div className="text-left space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
          Welcome back, {signedInUser?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg">
          Here's a quick overview of your learning journey.
        </p>
      </div>

      <section className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-6">
          Ongoing Courses
        </h2>
        <OngoingCourses user={signedInUser} />
      </section>

      <section className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-6">
          Finished Courses
        </h2>
        <FinishedCourses user={signedInUser} />
      </section>
    </div>
  );
};

export default Dashboard;
