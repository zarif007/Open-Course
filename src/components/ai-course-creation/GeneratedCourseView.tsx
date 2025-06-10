'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';
import TopicCard from './TopicCard';
import CheckpointIndicator from './CheckpointIndicator';

interface ITopic {
  id: number;
  title: string;
  timeToComplete: number;
  url: string;
}

interface ICheckPoint {
  topicID: number;
  name: string;
}

interface GeneratedCourseViewProps {
  course: {
    title: string;
    topics: ITopic[];
    checkPoints: ICheckPoint[];
  };
  checkPointMap: Map<number, string>;
  isCreatingCourse: boolean;
  onCreateCourse: () => void;
  onTryAnother: () => void;
}

const GeneratedCourseView = ({
  course,
  checkPointMap,
  isCreatingCourse,
  onCreateCourse,
  onTryAnother,
}: GeneratedCourseViewProps) => (
  <div className="w-full max-w-4xl mx-auto">
    <div className="flex flex-col">
      <h2 className="pt-8 pb-2 text-5xl text-center font-bold">
        {course.title}
      </h2>
      <div className="flex justify-end my-2 space-x-2">
        <Button
          variant="outline"
          onClick={onTryAnother}
          disabled={isCreatingCourse}
        >
          Try Another
        </Button>
        <Button
          variant="general"
          onClick={onCreateCourse}
          disabled={isCreatingCourse}
        >
          {isCreatingCourse ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Course...
            </>
          ) : (
            'Convert to a Course'
          )}
        </Button>
      </div>
      <div className="space-y-0 w-full">
        <AnimatePresence mode="popLayout">
          {course.topics.map((topic) => (
            <div key={topic.id} className="w-full">
              <CheckpointIndicator
                topicId={topic.id}
                checkPointMap={checkPointMap}
              />
              <TopicCard topic={topic} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  </div>
);

export default GeneratedCourseView;
