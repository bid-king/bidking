import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number | null;
  isLogined: boolean;
  accessToken: string;
  nickname: string;
  refreshToken: string;
}

const initialState: UserState = {
  id: null,
  isLogined: false,
  accessToken: '',
  nickname: '',
  refreshToken: '',
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInformation(state, action: PayloadAction<UserState>) {
      state.isLogined = action.payload.isLogined;
      state.accessToken = action.payload.accessToken;
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { setUserInformation } = user.actions;

export default user.reducer;
