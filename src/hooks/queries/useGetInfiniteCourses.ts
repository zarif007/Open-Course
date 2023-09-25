import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const LIMIT = 6;

const getCourses = async (page: number) => {
  const { data } = await axios.get(
    `${nextApiEndPoint}/courses?page=${page}&limit=${LIMIT}`
  );
  return data.data;
};
const useGetInfiniteCourses = () => {
  return useInfiniteQuery(
    ["courses"],
    async ({ pageParam = 1 }) => await getCourses(pageParam),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage =
          lastPage.length === LIMIT ? allPages.length + 1 : undefined;
        return nextPage;
      },
    }
  );
};

export default useGetInfiniteCourses;
