"use client";

import { v1MainEndpoint } from "@/utils/apiEndpoints";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user?.id) return;
    const getUserInfo = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `${v1MainEndpoint}/user/byExternalId/${user?.id}`
      );
      if (!data.data) router.push("/onboarding");
      setIsLoading(false);
    };
    getUserInfo();
  }, [user, pathname]);

  return <div>{children}</div>;
};

export default OnboardingProvider;
