import { ICourse } from "@/types/course";
import { ICourseTopic } from "@/types/courseTopic";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IInitialState {
  value: {
    course: ICourse;
    currentCourseTopic: ICourseTopic;
  };
}

const initialState = {
  value: {
    course: {
      title: "New Course 🐉",
      categories: [],
      levels: [],
      coursePrivacy: "public",
      topicPrivacy: "locked",
      languages: [],
      topics: [
        {
          id: 0,
          topicID: 0,
          sortID: 0,
          views: 0,
          versions: [
            {
              type: "free_source_content",
              data: {
                title: "Example101",
                url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
                source: "https://www.youtube.com",
                description: "Just another example",
                duration: 10,
              },
            },
          ],
        },
      ],
    },
    currentCourseTopic: {
      id: -1,
      topicID: -1,
      sortID: -1,
      views: 0,
      versions: [
        {
          type: "free_source_content",
          data: {
            title: "Example101",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
            source: "https://www.youtube.com",
            description: "Just another example",
            duration: 10,
          },
        },
      ],
    },
  },
} as IInitialState;

export const courseUpdate = createSlice({
  name: "courseUpdate",
  initialState,
  reducers: {
    setCourseForUpdate: (state, action: PayloadAction<ICourse>) => {
      state.value.course = action.payload;
    },
    setCurrentCourseTopicForUpdate: (
      state,
      action: PayloadAction<ICourseTopic>
    ) => {
      state.value.currentCourseTopic = action.payload;
    },
  },
});

export const { setCourseForUpdate, setCurrentCourseTopicForUpdate } =
  courseUpdate.actions;
export default courseUpdate.reducer;
