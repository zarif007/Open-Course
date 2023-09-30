"use client";

import { setSignedInUser } from "@/redux/features/signed-In-user-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MainLoading from "../skeletons/Main.Loading";
import { useSession } from "next-auth/react";

const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const { data: session } = useSession();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!session?.user?.email) return;

    const getUserInfo = async () => {
      setIsLoading(true);
      // create endpoint
      try {
        const { data } = await axios.get(
          `${nextApiEndPoint}/user/byEmail/${session?.user?.email}`
        );
        if (!data.data) {
          router.push("/onboarding");
          dispatch(setSignedInUser(null));
        } else {
          dispatch(setSignedInUser(data.data));
        }
      } catch (error) {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    if (!signedInUser || signedInUser.email !== session.user.email) {
      getUserInfo();
    }
  }, [session?.user, router, signedInUser, dispatch]);

  return <div>{children}</div>;
};

export default OnboardingProvider;
