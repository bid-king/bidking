import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ROOT } from '../util/http';
import { addNotification } from '../../store/slices/alarmSlice';

export function useAlarmEvent(memberId: string) {
  type AlarmEvent = {
    content: string;
    alarmType: string;
  };
  const dispatch = useAppDispatch();

  const eventSource = new EventSource(`${ROOT}/api/v1/alarms/subscribe/${memberId}`);

  eventSource.onmessage = (res: MessageEvent) => {
    const notification: AlarmEvent = JSON.parse(res.data);
    console.log(res);
    dispatch(addNotification(notification)); // 알림 추가 액션 디스패치
  };

  eventSource.onerror = error => {
    console.error('EventSource failed:', error);
    eventSource.close();
  };

  return () => {
    eventSource.close();
  };
}
