import InvitationHandler from "@/components/CourseInvitation/InvitationHandler";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
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

const CourseInvitation = async ({ params }: PageParams) => {
  const { data, message } = await getData(params.id);

  return <InvitationHandler invitationData={data} message={message} />;
};

export default CourseInvitation;
