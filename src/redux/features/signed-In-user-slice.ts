import { IUser } from '@/types/user';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IInitialState {
  value: {
    signedInUser: IUser | null;
    isLoaded: boolean;
  };
}

const initialState = {
  value: {
    signedInUser: null,
    isLoaded: false,
  },
} as IInitialState;

export const signedInUser = createSlice({
  name: 'signedInUser',
  initialState,
  reducers: {
    setSignedInUser: (state, action: PayloadAction<IUser | null>) => {
      state.value.signedInUser = action.payload;
    },
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.value.isLoaded = action.payload;
    },
  },
});

export const { setSignedInUser, setIsLoaded } = signedInUser.actions;
export default signedInUser.reducer;
