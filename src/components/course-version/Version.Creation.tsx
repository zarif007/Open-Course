import React from 'react';
import CourseTopicCreation from '../course-topic/CourseTopicCreation';
import { useAppSelector } from '@/redux/store';
import { toast } from '../ui/Toast';
import { ICourseTopic } from '@/types/courseTopic';
import { ITopicVersion } from '@/types/topicVersion';
import axios from 'axios';
import { nextApiEndPoint } from '@/utils/apiEndpoints';

const VersionCreation = ({
  isLoading,
  setIsLoading,
  setOpenPanel,
  versions,
  setVersions,
}: {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenPanel: React.Dispatch<React.SetStateAction<boolean>>;
  versions: ITopicVersion[];
  setVersions: React.Dispatch<React.SetStateAction<ITopicVersion[]>>;
}) => {
  const selectedTopicType = useAppSelector(
    (state) => state.selectedTopicType.value.selectedType
  );

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );

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
      setVersions([data.data, ...versions]);
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
    <CourseTopicCreation
      mode="contribution"
      selectedTopicType={selectedTopicType}
      handleAddToContrib={handleAddToContrib}
    />
  );
};

export default VersionCreation;
