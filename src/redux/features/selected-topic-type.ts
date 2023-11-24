import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IInitialState {
  value: {
    selectedType: "free_source_content" | "doc_content" | "quiz" | "";
  };
}

const initialState = {
  value: {
    selectedType: "",
  },
} as IInitialState;

export const selectedTopicType = createSlice({
  name: "selectedTopicType",
  initialState,
  reducers: {
    setSelectedTopicType: (
      state,
      action: PayloadAction<"free_source_content" | "doc_content" | "quiz" | "">
    ) => {
      state.value.selectedType = action.payload;
    },
  },
});

export const { setSelectedTopicType } = selectedTopicType.actions;
export default selectedTopicType.reducer;
