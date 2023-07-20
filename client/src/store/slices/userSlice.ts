import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  name: string;
}

const initialState: UserState = {
  name: 'seongYong',
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    checkMyName(state) {
      console.log(state);
    },
  },
});

export const { checkMyName } = user.actions;

export default user;
