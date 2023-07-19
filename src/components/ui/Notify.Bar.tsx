import React from "react";

const NotifyBar = ({ text }: { text: string }) => {
  return (
    <div className="mx-2 rounded-full gradient-bg p-[1px] text-center mb-4 text-gray-300 font-semibold w-full max-w-3xl">
      {text}
    </div>
  );
};

export default NotifyBar;
