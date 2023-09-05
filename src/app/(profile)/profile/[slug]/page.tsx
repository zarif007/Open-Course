/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import LargeHeading from "@/components/ui/LargeHeading";
import { IUser } from "@/types/user";
import { v1MainEndpoint } from "@/utils/apiEndpoints";
import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";
interface PageParams {
  params: {
    slug: string;
  };
}

const Profile = async ({ params }: PageParams) => {
  const { data } = await axios.get(
    `${v1MainEndpoint}/user/byUserName/${params.slug}`
  );
  const user: IUser | null = data.data;

  if (!user) redirect("/404");

  return (
    <section className="w-full max-w-5xl mx-auto h-full flex flex-col items-center justify-center">
      <img
        src={user.attributes.image_url}
        alt="dp"
        className="h-[25%] w-[25%] rounded shadow-[7px_18px_67px_64px_rgba(202,_54,_80,_0.18)]"
      />
      <LargeHeading className="my-6 underline decoration-rose-500 decoration-4">
        {user.attributes.last_name}
      </LargeHeading>
    </section>
  );
};

export default Profile;
