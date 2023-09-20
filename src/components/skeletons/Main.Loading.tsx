import Image from "next/image";
import React from "react";

const MainLoading = () => {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center bg-black">
      <div className="rounded py-4 px-8 bg-[#121212]">
        <Image
          src="/dark1.png"
          alt="logo"
          height="100"
          width="100"
          className="h-40 w-40"
        />
        <p className="text-center font-semibold text-lg animate-pulse">
          Loading.....
        </p>
      </div>
    </div>
  );
};

export default MainLoading;
