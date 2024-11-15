'use client';

import React, { useEffect } from 'react';
import GeneralNavbar from './General.Navbar';
import { usePathname, useRouter } from 'next/navigation';
import CourseBasedNavbar from './CourseBased.Navbar';
import { useSession } from 'next-auth/react';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import {
  setIsLoaded,
  setSignedInUser,
} from '@/redux/features/signed-In-user-slice';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import axios from 'axios';

const NavBar = () => {
  const pathname = usePathname();
  const isCoursePage = pathname?.startsWith('/course/');

  const { data: session } = useSession();

  const router = useRouter();

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!session?.user?.email) {
      dispatch(setSignedInUser(null));
      return;
    }
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get(
          `${nextApiEndPoint}/user/byEmail/${session?.user?.email}`
        );

        if (!data.data) {
          router.push('/login');
          return;
        }

        dispatch(setSignedInUser(data.data));
      } catch (error) {
        // Handle error
      } finally {
        dispatch(setIsLoaded(true));
      }
    };

    if (!signedInUser || signedInUser.email !== session.user.email) {
      getUserInfo();
    }
  }, [session, signedInUser]);

  return (
    <nav className="backdrop-blur-sm bg-slate-100/75 dark:bg-[#0a0a0a]/75 fixed w-full z-50 top-0 left-0 overflow-x-hidden">
      <div className="mx-auto p-4">
        {isCoursePage ? <CourseBasedNavbar /> : <GeneralNavbar />}
      </div>
    </nav>
  );
};

export default NavBar;
