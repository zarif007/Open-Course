import { IDiscussion } from "@/types/discussion";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateDiscussionMutation = async (updatedDiscussion: IDiscussion) => {
  try {
    const { data } = await axios.put(
      `${nextApiEndPoint}/discussion/${updatedDiscussion.id}`,
      updatedDiscussion
    );
    return data.data; // Assuming your API response is an object
  } catch (error) {
    throw error;
  }
};

export const useUpdateDiscussionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateDiscussionMutation, {
    onMutate: (updatedDiscussion) => {
      const snapShot = queryClient.getQueryData([
        "discussion",
        updatedDiscussion.id,
      ]);
      queryClient.setQueryData(
        ["discussion", updatedDiscussion.id],
        updatedDiscussion
      );
      return snapShot;
    },
    onError: (error, variables, snapshot) => {
      queryClient.setQueryData(["discussion", variables.id], snapshot);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["discussion"]);
    },
  });
};
