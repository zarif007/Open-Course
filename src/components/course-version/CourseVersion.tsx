import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import CourseTopicCreation from '../course-topic/CourseTopicCreation';
import { useAppSelector } from '@/redux/store';
import { ICourseTopic } from '@/types/courseTopic';
import axios from 'axios';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import { toast } from '../ui/Toast';
import { ITopicVersion } from '@/types/topicVersion';

const CourseVersion = () => {
  const selectedTopicType = useAppSelector(
    (state) => state.selectedTopicType.value.selectedType
  );

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );

  const [openPanel, setOpenPanel] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const errorToast = (errMsg: string) => {
    setIsLoading(false);
    toast({
      title: 'Error',
      type: 'error',
      message: errMsg,
    });
  };

  const handleAddToContrib = async (courseTopic: ICourseTopic) => {
    if (isLoading || !signedInUser?.id) return;
    setIsLoading(true);
    setOpenPanel(false);
    try {
      const version = courseTopic.versions[0];
      const reqData: ITopicVersion = {
        version,
        creator: signedInUser.id,
        stage: 'pending',
        topicId: currentCourseTopic.id as string,
      };
      const { data } = await axios.post(
        `${nextApiEndPoint}/topicVersion`,
        reqData
      );

      if (!data.success) {
        errorToast(data.message);
        return;
      }
      toast({
        title: 'Success',
        type: 'success',
        message: 'Uploaded successfully',
      });
      setIsLoading(false);
    } catch {
      errorToast('Something went wrong');
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button
          className="flex items-center space-x-2"
          onClick={() => setOpenPanel(!openPanel)}
        >
          <p>{!openPanel ? 'Add a new Version' : 'Done?'}</p>
          <MdOutlineAddToPhotos className="w-6 h-6" />
        </Button>
      </div>
      <p>{isLoading && 'Uploading....'}</p>
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
