"use client";

import { Button } from "@/components/ui/Button";
import GalaxyBg from "@/components/ui/ThreeD/GalaxyBg";
import AnimatedHoverCard from "@/components/ui/animation/AnimatedHoverCard";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FaDiscord, FaSquareFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";

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
  {
    name: "facebook",
    title: "Facebook",
    icon: <FaSquareFacebook className="w-7 h-7 text-[#4267B2]" />,
  },
  {
    name: "github",
    title: "Github",
    icon: <IoLogoGithub className="w-7 h-7" />,
  },
];

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const callbackUrl = searchParams?.get("callbackUrl") ?? "/";
  return (
    <div className="w-full h-screen pt-16 mx-auto my-auto">
      <GalaxyBg>
        <div className="w-full h-full flex flex-col space-y-3 items-center justify-center mx-auto">
          {providers.map((provider) => (
            <Button
              key={provider.name}
              isLoading={isLoading}
              className="w-80 py-8 flex space-x-2 justify-center items-center focus:ring-0"
              onClick={() => {
                signIn(provider.name, { callbackUrl });
                setIsLoading(true);
              }}
            >
              {provider.icon}
              <p className="font-bold text-lg">Sign In With {provider.title}</p>
            </Button>
          ))}
        </div>
      </GalaxyBg>
    </div>
  );
};

export default Login;
