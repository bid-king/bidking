import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const url = 'http://70.12.247.192:8080/api/v1/oauth/kakao/login';

interface UserState {
  userId?: string;
  isLogined?: boolean;
  accessToken?: string;
}

const initialState: UserState = {
  userId: '',
  isLogined: false,
  accessToken: '',
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserInformation(state, action: PayloadAction<UserState>) {
      state.isLogined = action.payload.isLogined;
      state.userId = action.payload.userId;
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { getUserInformation } = user.actions;

export default user.reducer;
