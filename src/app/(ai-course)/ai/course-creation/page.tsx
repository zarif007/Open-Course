'use client';

import { useState, KeyboardEvent, useEffect, useMemo } from 'react';
import { ArrowUp, Loader2, CheckCircle } from 'lucide-react';
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
import { ICheckPoint } from '@/types/checkPoint';

interface IAICourse {
  title: string;
  categories: string[];
  levels: string[];
  languages: string[];
  totalTimeTaken: number;
  topics: ITopic[];
  checkPoints: ICheckPoint[];
}

interface ITopic {
  id: number;
  title: string;
  timeToComplete: number;
  url: string;
}

interface LoadingStep {
  id: number;
  text: string;
  status: 'pending' | 'loading' | 'complete';
}

const LoadingIndicator = ({ steps }: { steps: LoadingStep[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-8 w-full max-w-md mx-auto"
  >
    <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
      Building Your Course
    </h3>
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: step.status !== 'pending' ? 1 : 0.5,
              height: 'auto',
            }}
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800"
          >
            <div className="flex-shrink-0">
              {step.status === 'complete' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : step.status === 'loading' ? (
                <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-neutral-700" />
              )}
            </div>
            <span
              className={`text-sm ${
                step.status === 'complete'
                  ? 'text-gray-600 dark:text-neutral-300'
                  : step.status === 'loading'
                    ? 'text-gray-900 dark:text-white font-medium'
                    : 'text-gray-500 dark:text-neutral-500'
              }`}
            >
              {step.text}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
    <p className="text-sm text-gray-500 dark:text-neutral-400 mt-6">
      This may take a few moments...
    </p>
  </motion.div>
);

const CheckpointIndicator = ({
  topicId,
  checkPointMap,
}: {
  topicId: number;
  checkPointMap: Map<number, string>;
}) => {
  const checkPointName = checkPointMap.get(topicId);
  if (!checkPointName) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: topicId * 0.1 }}
      className="relative mb-8"
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

const TopicCard = ({ topic }: { topic: ITopic }) => (
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
            className="w-12 h-12 object-contain rounded-md"
          />
          <div className="flex-1">
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
      </motion.div>
    </CourseEmbedLinkFullscreenDialog>
  </div>
);

const CoursePromptInput = ({
  prompt,
  setPrompt,
  handleSubmit,
}: {
  prompt: string;
  setPrompt: (value: string) => void;
  handleSubmit: () => void;
}) => (
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
        <span className="font-bold text-[black] dark:text-[white]">AI</span>
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
              if (e.key === 'Enter') handleSubmit();
            }}
            className="min-h-[120px] text-lg shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground flex-1 px-4 py-6 pr-12 resize-none placeholder:text-sm md:placeholder:text-lg"
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
);

const Page = () => {
  const [prompt, setPrompt] = useState('');
  const [course, setCourse] = useState<IAICourse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState<LoadingStep[]>([
    { id: 1, text: 'Analyzing your request', status: 'pending' },
    { id: 2, text: 'Generating course structure', status: 'pending' },
    { id: 3, text: 'Finding relevant resources', status: 'pending' },
    { id: 4, text: 'Building your course (0/0)', status: 'pending' },
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const router = useRouter();
  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const checkPointMap = useMemo(() => {
    if (!course?.checkPoints) return new Map();
    const map = new Map<number, string>();
    course.checkPoints.forEach((cp) => map.set(cp.topicID, cp.name));
    return map;
  }, [course?.checkPoints]);

  useEffect(() => {
    if (isLoading && currentStep < loadingSteps.length) {
      const timer = setTimeout(() => {
        setLoadingSteps((steps) =>
          steps.map((step) =>
            step.id === currentStep + 1
              ? { ...step, status: 'loading' }
              : step.id < currentStep + 1
                ? { ...step, status: 'complete' }
                : step
          )
        );
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isLoading]);

  const errorToast = (errMsg: string) => {
    toast({
      title: 'Error',
      type: 'error',
      message: errMsg,
    });
  };

  const updateStepStatus = (
    stepId: number,
    status: 'pending' | 'loading' | 'complete'
  ) => {
    setLoadingSteps((steps) =>
      steps.map((step) => (step.id === stepId ? { ...step, status } : step))
    );
  };

  const moveToNextStep = () => {
    if (currentStep < loadingSteps.length) {
      updateStepStatus(currentStep + 1, 'complete');
      setCurrentStep((prev) => prev + 1);
      if (currentStep + 1 < loadingSteps.length) {
        updateStepStatus(currentStep + 2, 'loading');
      }
    }
  };

  const handleSubmit = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setPrompt('');
    setCourse(null);

    setLoadingSteps([
      { id: 1, text: 'Analyzing your request', status: 'pending' },
      { id: 2, text: 'Generating course structure', status: 'pending' },
      { id: 3, text: 'Finding relevant resources', status: 'pending' },
      { id: 4, text: 'Building your course (0/0)', status: 'pending' },
    ]);
    setCurrentStep(0);
    updateStepStatus(1, 'loading');

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      moveToNextStep();

      const courseMeta = await generateAICourse(prompt);
      if (!courseMeta) {
        errorToast('Something went wrong, Try again later');
        setIsLoading(false);
        return;
      }

      moveToNextStep();
      setCourse({
        title: courseMeta.title,
        totalTimeTaken: courseMeta.totalTimeTaken,
        topics: [],
        categories: courseMeta.categories,
        levels: courseMeta.levels,
        languages: courseMeta.languages,
        checkPoints: courseMeta.checkPoints,
      });

      moveToNextStep();
      const totalTopics = courseMeta.topics.length;

      setLoadingSteps((steps) =>
        steps.map((step) =>
          step.id === 4
            ? { ...step, text: `Building your course (0/${totalTopics})` }
            : step
        )
      );

      for (let i = 0; i < totalTopics; i++) {
        const topic = courseMeta.topics[i];
        try {
          setLoadingSteps((steps) =>
            steps.map((step) =>
              step.id === 4
                ? {
                    ...step,
                    text: `Building your course (${i + 1}/${totalTopics})`,
                  }
                : step
            )
          );

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

      moveToNextStep();
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
      checkPoints: course.checkPoints,
      categories: course.categories,
      levels: course.levels,
      languages: course.languages,
      description: '',
      slug: createSlug(course.title),
      topics: courseTopics,
      creator: signedInUser.id,
      tags: [],
      status: 'draft',
      coursePrivacy: 'public',
      topicPrivacy: 'locked',
      banner: '',
      isAIGenerated: true,
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
          <LoadingIndicator steps={loadingSteps} />
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
        ) : (
          <CoursePromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            handleSubmit={handleSubmit}
          />
        )}
      </main>
    </div>
  );
};

export default Page;
