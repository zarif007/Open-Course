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
  const [openPanel, setOpenPanel] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );

  const [versions, setVersions] = useState<ITopicVersion[]>([]);

  const { isLoading: isFetching } = useQuery({
    queryKey: [`versions-${currentCourseTopic.id}`],
    queryFn: async () => {
      const { data } = await (
        await fetch(
          `${nextApiEndPoint}/topicVersion/byTopicId/${currentCourseTopic.id}`
        )
      ).json();
      setVersions(data);
    },
  });

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
        <VersionCreation
          isLoading={isLoading}
          setOpenPanel={setOpenPanel}
          setIsLoading={setIsLoading}
          versions={versions}
          setVersions={setVersions}
        />
      ) : (
        <div>
          {isFetching ? (
            <p>loading...</p>
          ) : (
            <DisplayVersions versions={versions} />
          )}
        </div>
      )}
    </div>
  );
};

export default TopicVersion;
