"use client";

import CommonComps from "@/components/auth/CommonComps";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Login = () => {
  const router = useRouter();

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  useEffect(() => {
    if (signedInUser?.id) {
      router.push("/");
    }
  }, [signedInUser]);

  return (
    <div className="w-full h-screen mx-auto my-auto">
      <CommonComps type="signIn" />
    </div>
  );
};

export default Login;
