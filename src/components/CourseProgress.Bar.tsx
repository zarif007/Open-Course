import React from 'react'
import CircleProgressBar from './ui/CircleProgress.Bar';
import Paragraph from './ui/Paragraph';
import { useAppSelector } from '@/redux/store';

const CourseProgressBar = ({ styles }: { styles: string }) => {

  const enrollState = useAppSelector((state) => state.courseViewReducer.value.enrollState);
  const course = useAppSelector((state) => state.courseViewReducer.value.course);

  const outOf = course.topics.length;
  const completed = enrollState.finishedTopics.length;
  
  return (
    <div className={`border-2 border-slate-300 dark:border-gray-800 ${styles} rounded-md flex items-center justify-center space-x-2`}>
        <CircleProgressBar value={parseFloat((completed / outOf).toFixed(2))} />
        <Paragraph className="font-semibold">{completed}/{outOf}</Paragraph>
    </div>
  )
}

export default CourseProgressBar