import { useAppSelector } from "@/redux/store";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { getFavicon } from "@/utils/getFavicon";
import Paragraph from "./ui/Paragraph";
import LargeHeading from "./ui/LargeHeading";
import CourseDetails from "./CourseDetails";
import { Button } from "./ui/Button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { v1MainEndpoint } from "@/utils/apiEndpoints";
import { toast } from "./ui/Toast";
import { useRouter } from "next/navigation";
import Router from 'next/router';

const CourseLandingPage = () => {
  const course = useAppSelector(
    (state) => state.courseViewReducer.value.course
  );

  const { user } = useUser();

  const router = useRouter()

  const handleEnrollment = async () => {
    try {
      const data = {
        course: course.id,
        user: user?.id
      }

      await axios.post(`${v1MainEndpoint}/enrollState`, data);

      
      // router.replace(`/course/${course.slug}`)
      window.location.reload()
      router.push(`${course.slug}?topicId=1`)

      toast({
        title: "Course Enrolled",
        type: "success",
        message: `${course.title} Enrolled Successfully`,
      })
    } catch (error) {
      toast({
        title: "error",
        type: "error",
        message: `Try again later`,
      })
    }
  }

  return (
    <div className="max-w-5xl w-full mx-auto ">
      <CourseDetails />
      <LargeHeading size="sm">Course Topics</LargeHeading>
      <Accordion type="single" collapsible>
        {course.topics.map((topic, index: number) => {
          const faviconURL = getFavicon(
            topic.versions[topic.versions.length - 1].url
          );
          return (
            <AccordionItem value={index.toString()} key={index} className="m-4 px-4 md:mx-6">
              <AccordionTrigger>
                {topic.versions[topic.versions.length - 1].title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex space-x-2">
                  <img src={faviconURL} className="h-7 w-7" alt="og" />
                  <Paragraph
                    size="sm"
                    className="truncate-text-1-line font-semibold"
                  >
                    {topic.versions[topic.versions.length - 1].duration}m
                  </Paragraph>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <div className="fixed bottom-0 w-full max-w-5xl mx-auto" onClick={handleEnrollment}>
        <div className="m-4 md:mx-6 mt-8">
          <Button className="w-full py-6 text-lg font-bold">Enroll</Button>
        </div>
      </div>
    </div>
  );
};

export default CourseLandingPage;
