import React, { useState } from 'react';
import CourseTopicsBar from '@/components/course-topic/CourseTopics.Bar';
import CourseTopicCreation from '@/components/course-topic/CourseTopicCreation';
import CourseDetailsCreation from '@/components/course-details/CourseDetailsCreation';
import LargeHeading from '@/components/ui/LargeHeading';
import CourseBannerCreationForm from '@/components/course-banner/CourseBannerCreation.Form';
import CourseCreationSteps from '@/components/course-details/CourseCreationSteps';
import { useAppSelector } from '@/redux/store';
import CreationPageNavButton from './CreationPage.NavButton';

const CourseCreationUpdate = ({
  MODE,
  loadingStatus,
  handleSubmit,
}: {
  MODE: 'creation' | 'edit';
  loadingStatus: 'free' | 'Processing' | 'Redirecting';
  handleSubmit: () => Promise<void>;
}) => {
  const [showCourseTopics, setShowCourseTopics] = useState(true);

  const selectedTopicType = useAppSelector(
    (state) => state.selectedTopicType.value.selectedType
  );

  const [currentTab, setCurrentTab] = useState<
    'description' | 'topic' | 'banner'
  >('description');

  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
      {currentTab === 'description' ? (
        <div className="w-full max-w-4xl mx-auto my-auto pt-8">
          <LargeHeading>Course Details</LargeHeading>
          <CourseDetailsCreation mode={MODE} />
        </div>
      ) : currentTab === 'topic' ? (
        <div className="flex pb-20">
          {/* Left */}
          <CourseTopicsBar
            showCourseTopics={showCourseTopics}
            setShowCourseTopics={setShowCourseTopics}
            mode={MODE}
          />

          {/* Right */}
          <div
            className={`${
              showCourseTopics ? 'w-full md:w-9/12' : 'w-full'
            }  ml-auto rounded mt-6`}
          >
            <CourseTopicCreation
              mode={MODE}
              selectedTopicType={selectedTopicType}
            />
          </div>
        </div>
      ) : (
        <CourseBannerCreationForm mode={MODE} />
      )}

      <CreationPageNavButton
        MODE={MODE}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        loadingStatus={loadingStatus}
        handleSubmit={handleSubmit}
      />

      <CourseCreationSteps
        step={currentTab === 'description' ? 0 : currentTab === 'topic' ? 1 : 2}
      />
    </section>
  );
};

export default CourseCreationUpdate;
