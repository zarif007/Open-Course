'use client';

import { motion } from 'framer-motion';
import { getFavicon } from '@/utils/getFavicon';
import CourseEmbedLinkFullscreenDialog from '@/components/course-embed-link/CourseEmbedLinkFullscreen.Dialog';

interface ITopic {
  id: number;
  title: string;
  timeToComplete: number;
  url: string;
}

interface TopicCardProps {
  topic: ITopic;
}

const TopicCard = ({ topic }: TopicCardProps) => (
  <div className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 my-2">
    <CourseEmbedLinkFullscreenDialog url={topic.url}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{
          duration: 0.4,
          delay: topic.id * 0.15,
          type: 'spring',
          bounce: 0.3,
        }}
        className="w-full p-2 rounded-lg hover:border-gray-300 dark:hover:border-neutral-700 transition-colors"
      >
        <div className="flex space-x-4 items-start text-start w-full">
          <img
            src={getFavicon(topic.url)}
            alt="favicon"
            className="w-12 h-12 object-contain rounded-md flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {topic.id}. {topic.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-neutral-400 mt-1">
              Time to complete: {topic.timeToComplete} minutes
            </p>
            <p className="text-xs text-gray-500 dark:text-neutral-500 mt-1 break-all overflow-wrap-anywhere">
              {topic.url}
            </p>
          </div>
        </div>
      </motion.div>
    </CourseEmbedLinkFullscreenDialog>
  </div>
);

export default TopicCard;
