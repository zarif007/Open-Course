import React, { useEffect } from 'react';
import { Button } from '../ui/Button';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import CourseTopicCreation from '../course-topic/CourseTopicCreation';
import { useAppSelector } from '@/redux/store';

const CourseVersion = () => {
  const selectedTopicType = useAppSelector(
    (state) => state.selectedTopicType.value.selectedType
  );
  const course = useAppSelector(
    (state) => state.courseCreationReducer.value.course
  );

  useEffect(() => {
    console.log(course.topics);
  }, [course.topics]);
  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button className="flex items-center space-x-2">
          <p>Add a new Version</p>
          <MdOutlineAddToPhotos className="w-6 h-6" />
        </Button>
      </div>
      <CourseTopicCreation
        mode="creation"
        selectedTopicType={selectedTopicType}
      />
    </div>
  );
};

export default CourseVersion;
