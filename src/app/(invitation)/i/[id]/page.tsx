import InvitationHandler from "@/components/CourseInvitation/InvitationHandler";
import IInvitationLink from "@/types/invitationLink";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import constructMetadata from "@/utils/constructMetadata";
import { Metadata } from "next";
import { headers } from "next/headers";
import React from "react";

interface PageParams {
  params: {
    id: string;
  };
}

const getData = async (id: string) => {
  const { data, message } = await (
    await fetch(`${nextApiEndPoint}/invitationLink/${id}`, {
      cache: "force-cache",
      method: "GET",
      headers: new Headers(headers()),
    })
  ).json();

  return { data, message };
};

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const { data } = await getData(params.id);

  if (!data) {
    return constructMetadata();
  }

  const text = "Invited to Join " + data.courseTitle;

  return constructMetadata({
    title: text,
    description: text,
    image: data.banner,
  });
};

const CourseInvitation = async ({ params }: PageParams) => {
  const { data, message } = await getData(params.id);

  return (
    <InvitationHandler invitationData={data} message={message} id={params.id} />
  );
};

export default CourseInvitation;
