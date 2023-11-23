import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const LIMIT = 6;

const getCourses = async (page: number, searchTerm: string) => {
  let url = `${nextApiEndPoint}/courses?page=${page}&limit=${LIMIT}`;

  if (searchTerm !== "") {
    url += searchTerm;
  }

  const { data } = await axios.get(url);

  return data.data;
};
const useGetInfiniteCourses = (searchTerm: string) => {
  return useInfiniteQuery(
    ["courses"],
    async ({ pageParam = 1 }) => await getCourses(pageParam, searchTerm),
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
