import React from "react";
import Discussions from "./Discussions";
import DiscussionSkeleton from "../skeletons/Discussion.Skeleton";
import DiscussionCreationForm from "./DiscussionCreation.Form";
import useGetDiscussions from "@/hooks/queries/useGetDIscusssions";
import { useAppSelector } from "@/redux/store";

const CourseDiscussion = () => {
  const currentCourseTopic = useAppSelector(
    (state) => state.courseViewReducer.value.currentCourseTopic
  );

  const version = currentCourseTopic.versions.length - 1;
  const topicId = currentCourseTopic.id as string;

  const { data: discussions, isLoading } = useGetDiscussions(version, topicId);

  return (
    <main>
      <DiscussionCreationForm version={version} topicId={topicId} />
      {isLoading ? (
        <DiscussionSkeleton />
      ) : (
        <React.Fragment>
          {discussions && <Discussions discussions={discussions} />}
        </React.Fragment>
      )}
    </main>
  );
};

export default CourseDiscussion;
