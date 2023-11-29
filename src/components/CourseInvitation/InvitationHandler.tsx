"use client";

/* eslint-disable @next/next/no-img-element */
import IInvitationLink from "@/types/invitationLink";
import React, { useState } from "react";
import Paragraph from "../ui/Paragraph";
import { Button, buttonVariants } from "../ui/Button";
import LargeHeading from "../ui/LargeHeading";
import { useRouter } from "next/navigation";
import { FaRegFaceSadCry } from "react-icons/fa6";
import { FcExpired } from "react-icons/fc";
import axios from "axios";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { toast } from "../ui/Toast";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Skeleton } from "../ui/Skeleton";

const InvitationHandler = ({
  invitationData,
  message,
  id,
}: {
  invitationData: IInvitationLink | null;
  message: string | null;
  id: string;
}) => {
  const router = useRouter();

  const [loadingStatus, setLoadingStatus] = useState<
    "free" | "Processing" | "Redirecting"
  >("free");

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const session = useSession();

  // session.status === "loading" && signedInUser === null

  const errorOnToast = (message: string) => {
    setLoadingStatus("free");
    toast({
      title: "Error",
      type: "error",
      message: message,
    });
  };

  const handleEnrollment = async () => {
    if (loadingStatus !== "free" || !signedInUser?.id) return;

    setLoadingStatus("Processing");

    try {
      const { data } = await axios.put(
        `${nextApiEndPoint}/invitationLink/${id}`
      );

      if (data.status !== 201) {
        errorOnToast(data.message);
        return;
      }

      const courseInfo: IInvitationLink = data.data;

      const enrollmentInfo = {
        course: courseInfo.courseId,
        user: signedInUser.id,
      };

      await axios.post(`${nextApiEndPoint}/enrollState`, enrollmentInfo);

      router.push(`/course/${courseInfo.courseSlug}`);
      setLoadingStatus("Redirecting");
      toast({
        title: "Course Enrolled",
        type: "success",
        message: `${courseInfo.courseTitle} Enrolled Successfully`,
      });
    } catch (error) {
      errorOnToast("Something went wrong, try again later");
    }
  };

  return (
    <div className="w-full max-w-5xl h-full flex flex-col justify-center items-center mx-auto my-16 px-2">
      {invitationData ? (
        <div className="w-full max-w-xl flex flex-col justify-center items-center">
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

          <Link
            href={`/course-landing/${invitationData.courseSlug}`}
            className={`${buttonVariants({
              variant: "outline",
            })} w-full my-1`}
          >
            View Course
          </Link>

          {session.status === "loading" ||
          (session.status === "authenticated" && !signedInUser) ? (
            <Skeleton className="w-full h-10" />
          ) : (
            <Button
              className="w-full my-1"
              onClick={() => {
                session.status === "authenticated"
                  ? handleEnrollment()
                  : signIn();
              }}
              isLoading={loadingStatus !== "free"}
            >
              {loadingStatus === "free" ? "Enroll" : loadingStatus}
            </Button>
          )}
        </div>
      ) : (
        <div className="w-xl gap-6 flex flex-col justify-center items-center mx-2 my-12">
          <FcExpired className="w-24 h-24 text-gray-950" />
          <LargeHeading size="sm">{message}</LargeHeading>
          <Button onClick={() => router.push("/")}>Back to Home page</Button>
        </div>
      )}
    </div>
  );
};

export default InvitationHandler;
