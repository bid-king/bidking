import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const url = 'http://70.12.247.192:8080/api/v1/oauth/kakao/login';

interface UserState {
  code?: string;
}

const initialState: UserState = {
  code: '',
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserInformation(state, action: PayloadAction<string>) {
      state.code = action.payload;
      axios
        .post(url, { code: state.code })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
});

export const { getUserInformation } = user.actions;

export default user;
