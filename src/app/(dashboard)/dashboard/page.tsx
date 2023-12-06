'use client';

import OngoingCourses from '@/components/dashboard/OngoingCourses';
import React from 'react';
import FinishedCourses from '@/components/dashboard/FinishedCourses';
import { useAppSelector } from '@/redux/store';

const Dashboard = () => {
  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  return (
    <div className="flex flex-col items-center justify-center mx-3">
      <OngoingCourses user={signedInUser} />
      <FinishedCourses user={signedInUser} />
    </div>
  );
};

export default Dashboard;
