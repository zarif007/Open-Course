/* eslint-disable @next/next/no-img-element */

import FinishedCourses from '@/components/dashboard/FinishedCourses';
import Heatmap from '@/components/dashboard/Heatmap';
import OngoingCourses from '@/components/dashboard/OngoingCourses';
import CreatedCourses from '@/components/profile/CreatedCourses';
import LargeHeading from '@/components/ui/LargeHeading';
import Points from '@/components/ui/Points';
import { IUser } from '@/types/user';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import axios from 'axios';
import { redirect } from 'next/navigation';
import React from 'react';

interface PageParams {
  params: {
    slug: string;
  };
}

const Profile = async ({ params }: PageParams) => {
  const { data } = await axios.get(
    `${nextApiEndPoint}/user/byUserName/${params.slug}`
  );

  const user: IUser | null = data.data;

  if (!user) redirect('/404');

  const countsRes = await axios.get(
    `${nextApiEndPoint}/courses/byCreator/getCounts/${user.id}`
  );
  const counts = countsRes.data;

  return (
    <div className="min-h-screen">
      <div className="relative h-44 md:h-56 w-full bg-slate-50 dark:bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 dark:from-black/10 to-transparent" />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto -mt-16">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
          <div className="relative">
            <img
              src={user.image}
              alt={`${user.name}'s profile`}
              className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-neutral-200 dark:border-neutral-800 object-cover shadow-sm"
            />
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <LargeHeading
              size="lg"
              className="text-neutral-900 dark:text-neutral-100 truncate font-semibold tracking-tight text-2xl md:text-3xl"
            >
              {user.name}
            </LargeHeading>

            <p className="text-neutral-600 dark:text-neutral-400 text-base font-medium">
              @{user.userName}
            </p>
            <p className="text-neutral-500 dark:text-neutral-500 text-sm max-w-md">
              Lifelong learner. Sharing knowledge with the community.
            </p>
          </div>

          <div className="rounded-xl px-4 py-2 border border-neutral-200 dark:border-neutral-800">
            <Points points={user.points ?? 0} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {[
            {
              label: 'Total Points',
              value: user.points ?? 0,
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              ),
            },
            {
              label: 'Courses Created',
              value: counts.createdCoursesCount ?? 0,
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              ),
            },
            {
              label: 'Courses Finished',
              value: 8,
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-1">
                    {item.label}
                  </p>
                  <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {item.value}
                  </p>
                </div>
                <div className="p-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-6">
          <div className="rounded-xl p-5 border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-1">
              Activity
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-4">
              Your learning visualized
            </p>
            <div className="overflow-x-auto">
              <Heatmap user={user} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800">
              <div className="p-5 border-b border-neutral-200 dark:border-neutral-800">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  Created Courses
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">
                  Courses you’ve shared
                </p>
              </div>
              <CreatedCourses creatorId={user.id as string} />
            </div>

            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800">
              <div className="p-5 border-b border-neutral-200 dark:border-neutral-800">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  Ongoing Courses
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">
                  Your about to be accomplishments
                </p>
              </div>
              <OngoingCourses user={user} />
            </div>

            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800">
              <div className="p-5 border-b border-neutral-200 dark:border-neutral-800">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  Completed Courses
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">
                  Your accomplishments
                </p>
              </div>
              <FinishedCourses user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
