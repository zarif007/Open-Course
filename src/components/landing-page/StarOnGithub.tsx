import axios from "axios";
import Link from "next/link";
import React from "react";
import { PiGithubLogoDuotone, PiStarDuotone } from "react-icons/pi";

const StarOnGithub = async () => {
  const repo = await axios.get(
    "https://api.github.com/repos/zarif007/Open-Course"
  );
  return (
    <Link
      href="https://github.com/zarif007/Open-Course"
      target="_blank"
      className="flex items-center text-gray-800 dark:text-slate-300"
    >
      <div className="flex items-center space-x-2 px-2 py-1 bg-slate-300 dark:bg-gray-800 rounded-l">
        <PiStarDuotone className="w-6 h-6" />
        <p className="font-bold">Star us on</p>
        <PiGithubLogoDuotone className="w-6 h-6" />
      </div>
      <div className="rounded-r bg-slate-200 dark:bg-gray-700 px-2 py-1">
        <p className="font-semibold ">{repo.data.stargazers_count}</p>
      </div>
    </Link>
  );
};

export default StarOnGithub;
