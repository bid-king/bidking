import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AlarmEvent = {
  content: string;
  alarmType: string;
};

const initialState: AlarmEvent[] = [];

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<AlarmEvent>) => {
      state.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      return state.filter(notification => notification.content !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
