'use client';

import { motion } from 'framer-motion';

interface CheckpointIndicatorProps {
  topicId: number;
  checkPointMap: Map<number, string>;
}

const CheckpointIndicator = ({
  topicId,
  checkPointMap,
}: CheckpointIndicatorProps) => {
  const checkPointName = checkPointMap.get(topicId);
  if (!checkPointName) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: topicId * 0.1 }}
      className="relative my-4"
    >
      <div className="relative">
        <div className="flex justify-center">
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 px-5 py-2.5 rounded-md">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-slate-400 dark:bg-gray-500 rounded-full"></div>
              <span className="text-sm font-medium text-slate-700 dark:text-gray-300 tracking-wide">
                {checkPointName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckpointIndicator;
