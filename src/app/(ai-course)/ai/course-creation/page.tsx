'use client';

import { useState, KeyboardEvent } from 'react';
import { ArrowUp, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFavicon } from '@/utils/getFavicon';
import CourseEmbedLinkFullscreenDialog from '@/components/course-embed-link/CourseEmbedLinkFullscreen.Dialog';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/Toast';
import { Textarea } from '@/components/ui/Textarea';
import generateAICourse from '@/actions/generateAICourse';
import { scrapeFirstSearchResult } from '@/actions/scrapeSearch';
import { useAppSelector } from '@/redux/store';
import { ICourse } from '@/types/course';
import createSlug from '@/utils/createSlug';
import { ICourseTopic } from '@/types/courseTopic';
import generateBannerFromCourse from '@/utils/generateBannerFromCourse';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IAICourse {
  title: string;
  categories: string[];
  levels: string[];
  languages: string[];
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
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);

  const router = useRouter();

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const errorToast = (errMsg: string) => {
    toast({
      title: 'Error',
      type: 'error',
      message: errMsg,
    });
  };

  const handleSubmit = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setPrompt('');
    setCourse(null);

    try {
      const courseMeta = await generateAICourse(prompt);

      if (!courseMeta) {
        errorToast('Something went wrong, Try again later');
        setIsLoading(false);
        return;
      }

      setCourse({
        title: courseMeta.title,
        totalTimeTaken: courseMeta.totalTimeTaken,
        topics: [],
        categories: courseMeta.categories,
        levels: courseMeta.levels,
        languages: courseMeta.languages,
      });

      for (let i = 0; i < courseMeta.topics.length; i++) {
        const topic = courseMeta.topics[i];
        try {
          const result = await scrapeFirstSearchResult(topic.title, topic.from);
          if (result?.url) {
            const newTopic: ITopic = {
              id: i + 1,
              title: topic.title,
              timeToComplete: 0,
              url: result.url,
            };

            setCourse((prev) => {
              if (!prev) return null;
              return {
                ...prev,
                topics: [...prev.topics, newTopic],
              };
            });
          }
        } catch (e) {
          console.error(`Failed to scrape for ${topic.title}`, e);
        }
      }
    } catch (error) {
      errorToast('Something went wrong, Try again later');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCourseCreation = async () => {
    if (!course || !signedInUser?.id || isCreatingCourse) return;

    setIsCreatingCourse(true);

    const courseTopics: ICourseTopic[] = course.topics.map((topic, index) => ({
      id: topic.id,
      title: topic.title,
      timeToComplete: topic.timeToComplete,
      url: topic.url,
      topicID: index + 1,
      sortID: index + 1,
      versions: [
        {
          type: 'free_source_content',
          creator: signedInUser.id ?? '',
          data: {
            title: topic.title,
            url: topic.url,
            source: topic.url,
            duration: 0,
          },
        },
      ],
    }));

    const courseData: ICourse = {
      title: course.title,
      type: 'gn',
      version: 1,
      enabled: true,
      contributors: [],
      enrolledUsers: [],
      categories: course.categories,
      levels: course.levels,
      languages: course.languages,
      description: '',
      slug: createSlug(course.title),
      topics: courseTopics,
      creator: signedInUser.id,
      tags: [],
      status: 'draft',
      checkPoints: [],
      coursePrivacy: 'public',
      topicPrivacy: 'open',
      banner: '',
    };

    courseData.banner = generateBannerFromCourse(courseData, signedInUser.name);

    try {
      const { data } = await axios.post(`/api/course`, courseData);

      if (!data.success) {
        errorToast(data.message);
        setIsCreatingCourse(false);
        return;
      }
      toast({
        title: 'Course Created',
        type: 'success',
        message: 'Course Created Successfully',
      });
      router.push(`/course-landing/${data.data.slug}`);
    } catch (error) {
      errorToast('Something went wrong, Try again later');
      setIsCreatingCourse(false);
    }
  };

  return (
    <div className="min-h-full flex flex-col">
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
                {course.title}
              </h2>
              <div className="flex justify-end my-2 space-x-2">
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  disabled={isCreatingCourse}
                >
                  Try Another
                </Button>
                <Button
                  variant="general"
                  onClick={handleCourseCreation}
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
                              <p className="text-xs text-gray-500 dark:text-neutral-500 mt-1 break-words break-all">
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
          <div className="w-full max-w-3xl">
            <div className="text-center space-y-4 my-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                What Course do you want to{' '}
                <span className="px-2 rounded-md animate-gradient-border bg-[length:400%_100%] bg-gradient-to-r from-rose-500 via-rose-500 to-blue-500 dark:from-rose-800 dark:via-rose-800 dark:to-blue-800">
                  build
                </span>{' '}
                today
              </h1>
              <p className="text:sm md:text-xl text-muted-foreground">
                Curate & Create any course with the power of{' '}
                <span className="font-bold text-[black] dark:text-[white]">
                  AI
                </span>
              </p>
            </div>
            <div className="relative p-[2px] rounded-md animate-gradient-border bg-[length:400%_100%] bg-gradient-to-r from-rose-500 via-rose-500 to-blue-500 dark:from-rose-800 dark:via-rose-800 dark:to-blue-800">
              <div className="bg-background rounded-md flex flex-col items-center gap-3">
                <div className="relative w-full">
                  <Textarea
                    placeholder="Example: 'Learn React' or 'Advanced Python for Data Science'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={(e: KeyboardEvent<HTMLTextAreaElement>) => {
                      if (e.key === 'Enter') {
                        handleSubmit();
                      }
                    }}
                    className="min-h-[120px] text-lg shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground flex-1 px-4 py-6 pr-12 resize-none
               placeholder:text-sm md:placeholder:text-lg"
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
