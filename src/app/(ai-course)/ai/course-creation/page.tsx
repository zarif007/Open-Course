'use client';

import { useState, KeyboardEvent } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFavicon } from '@/utils/getFavicon';
import CourseEmbedLinkFullscreenDialog from '@/components/course-embed-link/CourseEmbedLinkFullscreen.Dialog';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/Toast';
import generateAICourse from '@/actions/generateAICourse';
import { Textarea } from '@/components/ui/Textarea';

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
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 text-gray-600 dark:text-neutral-400"
          >
            Generating course outline...
          </motion.div>
        ) : course ? (
          <div className="w-full max-w-4xl mx-auto">
            <div className="flex flex-col">
              <h2 className="pt-8 pb-2 text-5xl text-center font-bold">
                {course.name}
              </h2>
              <h4 className="pb-8 text-lg text-center font-semibold text-slate-500">
                {course.totalTimeTaken} {course.totalTimeTaken && 'minutes'}
              </h4>
              <div className="flex justify-end my-2">
                <Button variant="general">Convert to a Course</Button>
              </div>
              <ul className="space-y-2">
                <AnimatePresence mode="popLayout">
                  <div className="flex flex-col space-y-4">
                    {course.topics.map((topic) => (
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
                          <div className="flex space-x-4 items-center text-start">
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
          </div>
        ) : (
          <div className="w-full h-full max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-6xl font-bold tracking-tight">
                  What Course you want to{' '}
                  <span className="px-2 rounded-md animate-gradient-border bg-[length:400%_100%] bg-gradient-to-r from-rose-500 via-violet-500 to-blue-500 dark:from-rose-800 dark:via-violet-800 dark:to-blue-800">
                    build
                  </span>{' '}
                  today
                </h1>
                <p className="text-xl text-muted-foreground">
                  Develop Course with{' '}
                  <span className="font-bold text-[black] dark:text-[white]">
                    Free
                  </span>{' '}
                  Internet&#39;s content and the power of{' '}
                  <span className="font-bold text-[black] dark:text-[white]">
                    AI
                  </span>
                </p>
              </div>
            </motion.div>

            <div className="relative p-[2px] rounded-md animate-gradient-border bg-[length:400%_100%] bg-gradient-to-r from-rose-500 via-violet-500 to-blue-500 dark:from-rose-800 dark:via-violet-800 dark:to-blue-800">
              <div className="bg-background rounded-md flex flex-col items-center gap-3">
                <div className="relative w-full">
                  <Textarea
                    placeholder="Example: 'Learn React in 7 days' or 'Advanced Python for Data Science'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={(e: KeyboardEvent<HTMLTextAreaElement>) => {
                      if (e.key === 'Enter') {
                        handleSubmit();
                      }
                    }}
                    className="min-h-[120px] text-lg shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground flex-1 px-4 py-6 pr-12 resize-none"
                  />
                  <Button
                    className="absolute right-3 bottom-3 h-12 w-12"
                    variant="default"
                    onClick={handleSubmit}
                  >
                    <ArrowUp className="w-10 h-10" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
