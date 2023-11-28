"use client";

/* eslint-disable @next/next/no-img-element */
import IInvitationLink from "@/types/invitationLink";
import React from "react";
import Paragraph from "../ui/Paragraph";
import { Button } from "../ui/Button";
import LargeHeading from "../ui/LargeHeading";
import { useRouter } from "next/navigation";
import { FaRegFaceSadCry } from "react-icons/fa6";
import { FcExpired } from "react-icons/fc";

const InvitationHandler = ({
  invitationData,
  message,
}: {
  invitationData: IInvitationLink | null;
  message: string | null;
}) => {
  const router = useRouter();
  return (
    <div className="w-full max-w-5xl h-full flex flex-col justify-center items-center mx-auto my-16">
      {invitationData ? (
        <div className="w-full max-w-xl flex flex-col justify-center items-center mx-2">
          <LargeHeading
            className="my-3 underline decoration-rose-500 decoration-4"
            size="sm"
          >
            Invited to join
          </LargeHeading>
          <img
            src={invitationData.banner}
            alt="course banner"
            className="w-full h-60 rounded"
          />
          <Paragraph className="font-bold">
            {invitationData.courseTitle}
          </Paragraph>
          <Button className="w-full my-1">Enroll</Button>
          <Button
            className="w-full my-1"
            variant="outline"
            onClick={() => router.push(invitationData.link)}
          >
            View Course
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-xl gap-6 flex flex-col justify-center items-center mx-2 my-12">
          <FcExpired className="w-24 h-24 text-gray-950" />
          <LargeHeading size="sm">{message}</LargeHeading>
          <Button onClick={() => router.push("/")}>Back to Home page</Button>
        </div>
      )}
    </div>
  );
};

export default InvitationHandler;
