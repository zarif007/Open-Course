"use client";

import { setSignedInUser } from "@/redux/features/signed-In-user-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!user?.id) return;
    const getUserInfo = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `${nextApiEndPoint}/user/byExternalId/${user?.id}`
      );
      if (!data.data) {
        router.push("/onboarding");
        dispatch(setSignedInUser(null));
      } else {
        dispatch(setSignedInUser(data.data));
      }
      setIsLoading(false);
    };

    if (signedInUser && signedInUser.externalId === user.id) return;
    getUserInfo();
  }, [user, pathname, signedInUser]);

  return <div>{children}</div>;
};

export default OnboardingProvider;
