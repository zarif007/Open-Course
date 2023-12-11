'use client';

import { ICourseTopic, IDocContent, IEmbedContent } from '@/types/courseTopic';
import React from 'react';
import CourseEmbedLinkDisplay from '../course-embed-link/CourseEmbedLink.Display';
import DocDisplay from '../course-doc/Doc.Display';

function CourseContent({ content }: { content: IEmbedContent | IDocContent }) {
  const toDisplay = () => {
    if ('source' in content) {
      return <CourseEmbedLinkDisplay content={content} />;
    } else if ('content' in content) {
      return <DocDisplay content={content} />;
    }

    return <p>Nothing...</p>;
  };

  return <div>{toDisplay()}</div>;
}

export default CourseContent;
