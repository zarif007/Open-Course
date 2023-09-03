import { configureStore } from "@reduxjs/toolkit";
import courseCreationReducer from "./features/course-creation-slice";
import courseViewReducer from "./features/course-view-slice";
import signedInUserReducer from "./features/signed-In-user-slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    courseCreationReducer,
    courseViewReducer,
    signedInUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
