'use client';

import { useState, KeyboardEvent } from 'react';
import { Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFavicon } from '@/utils/getFavicon';
import CourseEmbedLinkFullscreenDialog from '@/components/course-embed-link/CourseEmbedLinkFullscreen.Dialog';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/Toast';
import generateAICourse from '@/actions/generateAICourse';

interface IAICourse {
  name: string;
  totalTimeTaken: number;
  topics: ITopic[];
}

interface ITopic {
  id: number;
  title: string;
  timeToComplete: number;
  url: string;
}

const Page = () => {
  const [prompt, setPrompt] = useState('');
  const [course, setCourse] = useState<IAICourse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setPrompt('');
    setCourse(null);

    try {
      const course: IAICourse = await generateAICourse(prompt);
      setCourse(course);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Something went wrong',
        type: 'error',
        message: 'Please try again later',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full">
      <div className="container mx-auto py-4 pb-24">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 text-gray-600 dark:text-neutral-400"
          >
            Generating course outline...
          </motion.div>
        )}
        {course?.name && (
          <div className="flex flex-col">
            <h2 className="pt-8 pb-2 text-5xl text-center font-bold">
              {course?.name}
            </h2>
            <h4 className="pb-8 text-lg text-center font-semibold text-slate-500">
              {course?.totalTimeTaken} {course?.totalTimeTaken && 'minutes'}
            </h4>
            <div className="flex justify-end my-2">
              <Button variant="general">Convert to a Course</Button>
            </div>
            <ul className="space-y-2">
              <AnimatePresence mode="popLayout">
                <div className="flex flex-col space-y-4">
                  {course?.topics.map((topic) => (
                    <CourseEmbedLinkFullscreenDialog
                      key={topic.id}
                      url={topic.url}
                    >
                      <motion.li
                        key={topic.title}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{
                          duration: 0.4,
                          delay: topic.id * 0.15,
                          type: 'spring',
                          bounce: 0.3,
                        }}
                        className="p-4 rounded-lg bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-700 transition-colors"
                      >
                        <div className="block flex space-x-4 items-center text-start">
                          <img
                            src={getFavicon(topic.url ?? '')}
                            className="w-12 h-12"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {topic.id}. {topic.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-neutral-400 mt-1">
                              Time to complete: {topic.timeToComplete} minutes
                            </p>
                            <p className="text-xs text-gray-500 dark:text-neutral-500 mt-1 break-words">
                              {topic.url}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    </CourseEmbedLinkFullscreenDialog>
                  ))}
                </div>
              </AnimatePresence>
            </ul>
          </div>
        )}
      </div>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-neutral-800 p-4"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="relative">
            <div className="flex items-center gap-2 absolute left-4 top-1/2 -translate-y-1/2">
              <Mic className="w-4 h-4 text-gray-400 dark:text-neutral-400" />
            </div>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
              placeholder={isLoading ? 'Generating...' : 'Create a course...'}
              disabled={isLoading}
              className="w-full p-4 pl-20 pr-32 rounded-lg bg-gray-100 dark:bg-neutral-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-neutral-400 border border-gray-300 dark:border-neutral-800 focus:outline-none focus:border-gray-400 dark:focus:border-neutral-700 focus:ring-1 focus:ring-gray-400 dark:focus:ring-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                className="p-2 rounded-md bg-gray-200 dark:bg-neutral-800 text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
