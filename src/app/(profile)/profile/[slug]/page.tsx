/* eslint-disable @next/next/no-img-element */

import CreatedCourses from "@/components/profile/CreatedCourses";
import LargeHeading from "@/components/ui/LargeHeading";
import { IUser } from "@/types/user";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";
import { BiCoinStack } from "react-icons/bi";

interface PageParams {
  params: {
    slug: string;
  };
}

const Profile = async ({ params }: PageParams) => {
  const { data } = await axios.get(
    `${nextApiEndPoint}/user/byUserName/${params.slug}`
  );

  const user: IUser | null = data.data;

  if (!user) redirect("/404");

  return (
    <section className="w-full max-w-7xl mx-auto h-full flex flex-col items-center justify-center">
      <img
        src={user.image}
        alt="dp"
        className="w-[30%] h-[30%] md:w-[10%] md:h-[10%] rounded-full"
      />
      <LargeHeading
        size="sm"
        className="mt-6 mb-1 underline decoration-rose-500 decoration-4"
      >
        {user.name}
      </LargeHeading>
      <p className="font-semibold text-md text-slate-300 dark:text-gray-700 mt-1 mb-4">
        @{user.userName}
      </p>
      <div className="flex space-x-2 justify-center items-center rounded bg-rose-500 px-4 py-1 font-semibold">
        <p>{user.points ?? 0}</p>
        <BiCoinStack />
      </div>
      <CreatedCourses creatorId={user.id as string} />
    </section>
  );
};

export default Profile;
