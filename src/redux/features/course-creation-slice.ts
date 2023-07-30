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
      title: "Dragon Training 🐉",
      topics: [
        {
          id: 0,
          title: "Example101",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
          description: "Just another example",
        },
      ],
    },
    currentCourseTopic: {
      id: -1,
      title: "",
      description: "",
      url: "",
    },
  },
} as IInitialState;

export const courseCreation = createSlice({
  name: "courseCreation",
  initialState,
  reducers: {
    setCourseForCreation: (state, action: PayloadAction<ICourse>) => {
      state.value.course = action.payload;
    },
    setCurrentCourseTopicForCreation: (
      state,
      action: PayloadAction<ICourseTopic>
    ) => {
      state.value.currentCourseTopic = action.payload;
    },
  },
});

export const { setCourseForCreation, setCurrentCourseTopicForCreation } =
  courseCreation.actions;
export default courseCreation.reducer;
