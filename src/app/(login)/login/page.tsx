"use client";

import { Button } from "@/components/ui/Button";
import GalaxyBg from "@/components/ui/ThreeD/GalaxyBg";
import { useAppSelector } from "@/redux/store";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
      <GalaxyBg>
        <div className="w-full h-full flex flex-col space-y-3 items-center justify-center mx-auto">
          <p className="text-2xl underline decoration-rose-500 decoration-4 font-bold text-center">
            Sign In With
          </p>
          {providers.map((provider) => (
            <Provider key={provider.name} provider={provider} />
          ))}
        </div>
      </GalaxyBg>
    </div>
  );
};

const Provider = ({
  provider,
}: {
  provider: { name: string; title: string; icon: React.JSX.Element };
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const callbackUrl = searchParams?.get("callbackUrl") ?? "/";
  return (
    <Button
      isLoading={isLoading}
      className="w-80 py-8 flex space-x-2 justify-center items-center focus:ring-0"
      onClick={() => {
        signIn(provider.name, { callbackUrl });
        setIsLoading(true);
      }}
    >
      {provider.icon}
      <p className="font-bold text-lg">{provider.title}</p>
    </Button>
  );
};

export default Login;
