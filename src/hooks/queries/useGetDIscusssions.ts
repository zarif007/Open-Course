import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetDiscussions = (
  version: number | undefined,
  topicId: string | undefined
) => {
  return useQuery({
    queryKey: [`discussions-${version}-${topicId}`],
    enabled: version !== undefined && !!topicId,
    refetchInterval: 1000,
    queryFn: async () => {
      const { data } = await axios.get(
        `${nextApiEndPoint}/discussion?topicId=${topicId}&version=${version}`
      );
      return data.data;
    },
  });
};

export default useGetDiscussions;
