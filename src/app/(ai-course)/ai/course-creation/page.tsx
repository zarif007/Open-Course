'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';
import { toast } from '@/components/ui/Toast';
import axios from 'axios';
import generateAICourse from '@/actions/generateAICourse';
import { scrapeFirstSearchResult } from '@/actions/scrapeSearch';
import createSlug from '@/utils/createSlug';
import generateBannerFromCourse from '@/utils/generateBannerFromCourse';
import { ICourse } from '@/types/course';
import { ICourseTopic } from '@/types/courseTopic';
import { ICheckPoint } from '@/types/checkPoint';
import AICourses from '@/components/ai-course-creation/AICourses';
import CoursePromptInput from '@/components/ai-course-creation/CoursePromptInput';
import LoadingIndicator from '@/components/ai-course-creation/LoadingIndicator';
import GeneratedCourseView from '@/components/ai-course-creation/GeneratedCourseView';

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

          const result = await scrapeFirstSearchResult(topic.queryStr);
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
    <div className="min-h-full flex flex-col max-w-full">
      <main className="flex-1 flex items-center justify-center p-4">
        {isLoading ? (
          <LoadingIndicator steps={loadingSteps} />
        ) : course ? (
          <GeneratedCourseView
            course={course}
            checkPointMap={checkPointMap}
            isCreatingCourse={isCreatingCourse}
            onCreateCourse={handleCourseCreation}
            onTryAnother={() => window.location.reload()}
          />
        ) : (
          <div>
            <CoursePromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              handleSubmit={handleSubmit}
            />
            <AICourses />
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
