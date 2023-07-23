import React from 'react'
import CircleProgressBar from './ui/CircleProgress.Bar';
import Paragraph from './ui/Paragraph';

const CourseProgressBar = ({ completed, outOf, styles }: { completed: number; outOf: number; styles: string }) => {
  return (
    <div className={`border-2 border-slate-300 dark:border-gray-800 ${styles} rounded-md flex items-center justify-center space-x-2`}>
        <CircleProgressBar value={parseFloat((completed / outOf).toFixed(2))} />
        <Paragraph className="font-semibold">{completed}/{outOf}</Paragraph>
    </div>
  )
}

export default CourseProgressBar