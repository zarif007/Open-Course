/* eslint-disable @next/next/no-img-element */
import InvitationHandlerButton from '@/components/course-invitation/InvitationHandler.Button';
import { buttonVariants } from '@/components/ui/Button';
import LargeHeading from '@/components/ui/LargeHeading';
import Paragraph from '@/components/ui/Paragraph';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import constructMetadata from '@/utils/constructMetadata';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import { FcExpired } from 'react-icons/fc';

interface PageParams {
  params: {
    id: string;
  };
}

const getData = async (id: string) => {
  const { data, message } = await (
    await fetch(`${nextApiEndPoint}/invitationLink/${id}`, {
      cache: 'force-cache',
      method: 'GET',
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

  const text = 'Invited to Join ' + data.courseTitle;

  return constructMetadata({
    title: text,
    description: text,
    image: data.banner,
  });
};

const CourseInvitation = async ({ params }: PageParams) => {
  const { data: invitationData, message } = await getData(params.id);

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
              variant: 'outline',
            })} w-full my-1`}
          >
            View Course
          </Link>

          <InvitationHandlerButton id={params.id} />
        </div>
      ) : (
        <div className="w-xl gap-6 flex flex-col justify-center items-center mx-2 my-12">
          <FcExpired className="w-24 h-24 text-gray-950" />
          <LargeHeading size="sm">{message}</LargeHeading>
          <Link
            href="/"
            className={`${buttonVariants({
              variant: 'general',
            })} w-full my-1`}
          >
            Back to Home page
          </Link>
        </div>
      )}
    </div>
  );
};

export default CourseInvitation;
