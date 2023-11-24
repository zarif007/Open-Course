import { configureStore } from "@reduxjs/toolkit";
import courseCreationReducer from "./features/course-creation-slice";
import courseViewReducer from "./features/course-view-slice";
import courseUpdateReducer from "./features/course-update-slice";
import signedInUserReducer from "./features/signed-In-user-slice";
import selectedTopicType from "./features/selected-topic-type";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    courseCreationReducer,
    courseViewReducer,
    courseUpdateReducer,
    signedInUserReducer,
    selectedTopicType,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
