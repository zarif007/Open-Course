import React from "react";

const NotifyBar = ({ text }: { text: string }) => {
  return (
    <div className="mx-2 rounded-full gradient-bg p-[1px] text-center my-6 text-gray-800 font-semibold w-full max-w-3xl">
      {text}
    </div>
  );
};

export default NotifyBar;
