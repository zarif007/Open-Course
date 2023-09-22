import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetDiscussions = (
  courseId: string | undefined,
  topicId: string | undefined
) => {
  return useQuery({
    queryKey: [`discussions-${courseId}-${topicId}`],
    enabled: !!courseId && !!topicId,
    refetchInterval: 1000,
    queryFn: async () => {
      const { data } = await axios.get(
        `${nextApiEndPoint}/discussion?courseId=${courseId}&topicId=${topicId}`
      );
      return data.data;
    },
  });
};

export default useGetDiscussions;
