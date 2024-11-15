import React, { ReactNode } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import { getFavicon } from '@/utils/getFavicon';
import { ICourseTopic } from '@/types/courseTopic';
import { FcDocument } from 'react-icons/fc';
import Paragraph from '../ui/Paragraph';

const CourseTopicsAccordion = ({
  courseTopics,
}: {
  courseTopics: ICourseTopic[];
}) => {
  const favIcon = (topic: ICourseTopic): ReactNode => {
    const version = topic.versions.length - 1;
    const topicInfo = topic.versions[version];
    if (topicInfo.type === 'free_source_content') {
      const favIconUrl = getFavicon(topicInfo.data.source ?? '');

      return <img src={favIconUrl} className="h-7 w-7" alt="og" />;
    } else {
      return <FcDocument className="h-7 w-7" />;
    }
  };
  return (
    <Accordion type="single" collapsible className="mb-8 z-10">
      {courseTopics.map((topic, index: number) => {
        return (
          <AccordionItem
            value={index.toString()}
            key={index}
            className="m-4 px-4 md:mx-6"
          >
            <AccordionTrigger className="text-start">
              {topic.versions[topic.versions.length - 1].data.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex space-x-2">
                {favIcon(topic)}
                <Paragraph
                  size="sm"
                  className="truncate-text-1-line font-semibold"
                >
                  {topic.versions[topic.versions.length - 1].data.duration}m
                </Paragraph>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default CourseTopicsAccordion;
