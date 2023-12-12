import { IDiscussion } from '@/types/discussion';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IInitialState {
  value: {
    discussions: IDiscussion[] | (IDiscussion | string)[];
  };
}

const initialState = {
  value: {
    discussions: [],
  },
} as IInitialState;

export const discussions = createSlice({
  name: 'discussions',
  initialState,
  reducers: {
    setDiscussions: (
      state,
      action: PayloadAction<IDiscussion[] | (IDiscussion | string)[]>
    ) => {
      state.value.discussions = action.payload;
    },
  },
});

export const { setDiscussions } = discussions.actions;
export default discussions.reducer;
