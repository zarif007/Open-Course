import { Button } from "@/components/ui/Button";
import { signIn } from "next-auth/react";
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
  //   {
  //     name: "discord",
  //     title: "Discord",
  //     icon: <FaDiscord className="w-7 h-7 text-[#5865F2]" />,
  //   },
  //   {
  //     name: "facebook",
  //     title: "Facebook",
  //     icon: <FaSquareFacebook className="w-7 h-7 text-[#4267B2]" />,
  //   },
  //   {
  //     name: "github",
  //     title: "Github",
  //     icon: <IoLogoGithub className="w-7 h-7" />,
  //   },
];

const OAuthProviders = () => {
  return (
    <div className="w-full h-full flex flex-col space-y-3 items-center justify-center mx-auto">
      {providers.map((provider) => (
        <Provider key={provider.name} provider={provider} />
      ))}
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
      className="w-full py-6 flex space-x-2 justify-center items-center focus:ring-0"
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

export default OAuthProviders;
