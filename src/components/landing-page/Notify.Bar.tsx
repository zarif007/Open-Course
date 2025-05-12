import React from 'react';

const NotifyBar = ({ text }: { text: string }) => {
  return (
    <div className="mx-2 rounded shadow-[7px_18px_67px_64px_rgba(202,_54,_80,_0.18)] p-[1px] text-center mb-1 dark:text-slate-100 text-gray-950 bg-rose-500 border-2 border-rose-500 bg-opacity-25 font-semibold w-full max-w-3xl">
      {text}
    </div>
  );
};

export default NotifyBar;
