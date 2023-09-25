import React from "react";
import Discussions from "./Discussions";
import DiscussionSkeleton from "../skeletons/Discussion.Skeleton";
import DiscussionCreationForm from "./DiscussionCreation.Form";
import useGetDiscussions from "@/hooks/queries/useGetDIscusssions";

const CourseDiscussion = ({
  courseId,
  topicId,
}: {
  courseId: string | undefined;
  topicId: string | undefined;
}) => {
  const { data: discussions, isLoading } = useGetDiscussions(courseId, topicId);

  return (
    <main>
      <DiscussionCreationForm courseId={courseId} topicId={topicId} />
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
