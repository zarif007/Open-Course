"use client";

import { v1MainEndpoint } from "@/utils/apiEndpoints";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const OnboardingProvide = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user?.id) return;
    const getUserInfo = async () => {
      const { data } = await axios.get(
        `${v1MainEndpoint}/user/byExternalId/${user?.id}`
      );
      if (!data.data) router.push("/onboarding");
    };
    getUserInfo();
  }, [user, pathname]);
  return <div>{children}</div>;
};

export default OnboardingProvide;
