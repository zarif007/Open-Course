import { ICourse } from "@/types/course";
import { ICourseTopic } from "@/types/courseTopic";
import { IEnrollState } from "@/types/enrollState";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IInitialState {
  value: {
    course: ICourse;
    currentCourseTopic: ICourseTopic;
    enrollState: IEnrollState;
  };
}

const initialState = {
  value: {
    course: {},
    currentCourseTopic: {
      id: -1,
      topicID: -1,
      versions: [
        {
          title: "",
          description: "",
          url: "",
          duration: 10,
        }
      ]
    },
    enrollState: {},
  },
} as IInitialState;

export const courseView = createSlice({
  name: "courseView",
  initialState,
  reducers: {
    setCourseForView: (state, action: PayloadAction<ICourse>) => {
      state.value.course = action.payload;
    },
    setCurrentCourseTopicForView: (state, action: PayloadAction<ICourseTopic>) => {
      state.value.currentCourseTopic = action.payload;
    },
    setEnrollState: (state, action: PayloadAction<IEnrollState>) => {
      state.value.enrollState = action.payload;
    },
  },
});

export const { setCourseForView, setCurrentCourseTopicForView, setEnrollState } = courseView.actions;
export default courseView.reducer;
