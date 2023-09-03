import { ICourse } from "@/types/course";
import { ICourseTopic } from "@/types/courseTopic";
import { IEnrollState } from "@/types/enrollState";
import { IUser } from "@/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IInitialState {
  value: {
    signedInUser: IUser | null;
  };
}

const initialState = {
  value: {
    signedInUser: null,
  },
} as IInitialState;

export const signedInUser = createSlice({
  name: "signedInUser",
  initialState,
  reducers: {
    setSignedInUser: (state, action: PayloadAction<IUser | null>) => {
      state.value.signedInUser = action.payload;
    },
  },
});

export const { setSignedInUser } = signedInUser.actions;
export default signedInUser.reducer;
