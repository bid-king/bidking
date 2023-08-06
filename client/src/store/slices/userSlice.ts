import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const url = 'http://70.12.247.192:8080/api/v1/oauth/kakao/login';

interface UserState {
  id: number | null;
  isLogined?: boolean;
  accessToken?: string;
}

const initialState: UserState = {
  id: null,
  isLogined: false,
  accessToken: '',
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserInformation(state, action: PayloadAction<UserState>) {
      state.isLogined = action.payload.isLogined;
      state.accessToken = action.payload.accessToken;
      state.id = action.payload.id;
    },
  },
});

export const { getUserInformation } = user.actions;

export default user.reducer;
