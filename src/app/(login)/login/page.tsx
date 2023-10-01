"use client";

import { Button } from "@/components/ui/Button";
import { signIn, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams?.get("callbackUrl") ?? "/";
  return (
    <div className="w-full h-screen pt-24 max-w-5xl mx-auto px-3 my-auto">
      <div className="flex h-[96%] justify-between items-center rounded border-2 border-rose-500">
        <div className="w-1/2 flex items-center justify-center">
          <Button
            className="px-12 py-8"
            onClick={() => signIn("google", { callbackUrl })}
          >
            <div className="flex space-x-4 justify-center items-center">
              <FcGoogle className="w-8 h-8" />
              <p className="font-bold text-2xl">Sign In With Google</p>
            </div>
          </Button>
        </div>
        <div className="w-1/2 h-full rounded bg-slate-300 dark:bg-[#121212] flex items-center justify-center">
          <Image
            src={theme === "light" ? "/light1.png" : "/dark1.png"}
            priority
            quality={100}
            height="100"
            width="100"
            alt="logo"
            className="h-60 w-60"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
