import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import VersionCreation from './Version.Creation';
import { useAppSelector } from '@/redux/store';
import { useQuery } from '@tanstack/react-query';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import DisplayVersions from './DisplayVersions';
import { ITopicVersion } from '@/types/topicVersion';

const TopicVersion = () => {
  const [openPanel, setOpenPanel] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );

  const {
    data: requestedVersions = [],
    isLoading: isFetching,
    refetch,
  } = useQuery({
    queryKey: [`versions-${currentCourseTopic?.id}`],
    queryFn: async () => {
      const res = await fetch(
        `${nextApiEndPoint}/topicVersion/byTopicId/${currentCourseTopic.id}`
      );
      const json = await res.json();
      return json.data;
    },
    enabled: !!currentCourseTopic?.id,
  });

  const updateTopic = async (updatedVersions: any) => {
    const res = await fetch(`${nextApiEndPoint}/courseTopic`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: currentCourseTopic._id,
        versions: updatedVersions,
      }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to update topic');
    return result;
  };

  const updateVersionStage = async (versionId: string, stage: string) => {
    const res = await fetch(
      `${nextApiEndPoint}/topicVersion/byTopicId/${currentCourseTopic._id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: versionId, stage }),
      }
    );

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to update version');
    return result;
  };

  const handleTickClick = async (version: ITopicVersion) => {
    setIsProcessing(true);
    try {
      const formattedVersion = {
        creator: version.creator,
        data: version.version.data,
        type: version.version.type,
      };

      const updatedVersions = [
        ...currentCourseTopic.versions,
        formattedVersion,
      ];

      await updateTopic(updatedVersions);
      await updateVersionStage(version._id!, 'accepted');

      console.log('Version accepted and topic updated.');
      refetch();
    } catch (err) {
      console.error('Error accepting version:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveClick = async (version: ITopicVersion) => {
    setIsProcessing(true);
    try {
      await updateVersionStage(version._id!, 'rejected');
      console.log('Version rejected');
      refetch();
    } catch (err) {
      console.error('Error rejecting version:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button
          className="flex items-center space-x-2"
          onClick={() => setOpenPanel(!openPanel)}
          disabled={isProcessing}
        >
          <p>{!openPanel ? 'Add a new Version' : 'Done?'}</p>
          <MdOutlineAddToPhotos className="w-6 h-6" />
        </Button>
      </div>

      <p>{isUploading && 'Uploading....'}</p>
      <p>{isProcessing && 'Processing...'}</p>

      {openPanel ? (
        <VersionCreation
          isLoading={isUploading || isProcessing}
          setOpenPanel={setOpenPanel}
          setIsLoading={setIsUploading}
          versions={requestedVersions}
          setVersions={() => {
            setOpenPanel(false);
            refetch();
          }}
        />
      ) : isFetching ? (
        <p>loading...</p>
      ) : (
        <div>
          <DisplayVersions
            requestedVersions={requestedVersions}
            currentCourseTopic={currentCourseTopic}
            handleTickClick={handleTickClick}
            handleRemoveClick={handleRemoveClick}
          />
        </div>
      )}
    </div>
  );
};

export default TopicVersion;
