import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import CourseTopicCreation from '../course-topic/CourseTopicCreation';
import { useAppSelector } from '@/redux/store';
import { ICourseTopic } from '@/types/courseTopic';

const CourseVersion = () => {
  const selectedTopicType = useAppSelector(
    (state) => state.selectedTopicType.value.selectedType
  );

  const [openPanel, setOpenPanel] = useState<boolean>(false);

  const handleAddToContrib = async (data: ICourseTopic) => {
    console.log('panel', data);
    setOpenPanel(false);
  };

  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button
          className="flex items-center space-x-2"
          onClick={() => setOpenPanel(!openPanel)}
        >
          <p>Add a new Version</p>
          <MdOutlineAddToPhotos className="w-6 h-6" />
        </Button>
      </div>
      {openPanel ? (
        <CourseTopicCreation
          mode="contribution"
          selectedTopicType={selectedTopicType}
          handleAddToContrib={handleAddToContrib}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CourseVersion;
