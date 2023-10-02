"use client";

import { Button } from "@/components/ui/Button";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FaDiscord } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const providers = [
  {
    name: "google",
    title: "Google",
    icon: <FcGoogle className="w-7 h-7" />,
  },
  {
    name: "discord",
    title: "Discord",
    icon: <FaDiscord className="w-7 h-7 text-[#5865F2]" />,
  },
];

const Login = () => {
  const { theme } = useTheme();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams?.get("callbackUrl") ?? "/";
  return (
    <div className="w-full h-screen pt-24 max-w-5xl mx-auto px-3 my-auto">
      <div className="flex h-[96%] flex-col md:flex-row justify-between items-center rounded border-2 border-rose-500">
        <div className="w-full h-1/2 md:w-1/2 md:h-full flex flex-col space-y-3 items-center justify-center">
          {providers.map((provider) => (
            <Button
              key={provider.name}
              className="px-12 py-8 flex space-x-4 justify-center items-center"
              onClick={() => signIn(provider.name, { callbackUrl })}
            >
              {provider.icon}
              <p className="font-semibold text-xl">
                Sign In With {provider.title}
              </p>
            </Button>
          ))}
        </div>
        <div className="w-full h-1/2 md:w-1/2 md:h-full rounded bg-slate-300 dark:bg-[#121212] flex items-center justify-center">
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
