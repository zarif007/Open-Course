import { ICourseTopic } from "@/types/courseTopic";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IInitialState {
    value: {
        courseTopics: ICourseTopic[];
        currentCourseTopic: ICourseTopic;
        mode: "creation" | "edit" | "view";
    }
}

const initialState = {
  value: {
    courseTopics: [
      {
        id: 0,
        title: "Example101",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
        description: "Just another example",
      },
    ],
    currentCourseTopic: {
      id: -1,
      title: "",
      description: "",
      url: "",
    },
    mode: "creation"
  },
} as IInitialState;

export const courseCreation = createSlice({
  name: "courseCreation",
  initialState,
  reducers: {
    setCourseTopics: (state, action: PayloadAction<ICourseTopic[]>) => {
      state.value.courseTopics = action.payload;
    },
    setCurrentCourseTopic: (state, action: PayloadAction<ICourseTopic>) => {
      state.value.currentCourseTopic = action.payload;
    },
  }
});

export const { setCourseTopics, setCurrentCourseTopic } = courseCreation.actions;
export default courseCreation.reducer;