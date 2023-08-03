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

const CourseLandingPage = () => {
  const course = useAppSelector(
    (state) => state.courseViewReducer.value.course
  );

  return (
    <div className="max-w-5xl w-full mx-auto ">
      <CourseDetails />
      <div className="flex justify-end m-4 md:mx-6">
        <Button className="px-12">Enroll</Button>
      </div>
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
      <div className="m-4 md:mx-6 mt-8">
        <Button className="w-full">Enroll</Button>
      </div>
    </div>
  );
};

export default CourseLandingPage;
