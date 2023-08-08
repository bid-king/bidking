import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ROOT } from '../util/http';

export function useAlarmEvent(memberId: string) {
  const [alarm, setAlarm] = useState<AlarmEvent[]>([]);

  type AlarmEvent = {
    content: string;
    alarmType: string;
  };
  // const dispatch = useAppDispatch();

  const eventSource = new EventSource(`${ROOT}/api/v1/alarms/subscribe/${memberId}`);

  eventSource.onmessage = (res: MessageEvent) => {
    const notification: AlarmEvent = JSON.parse(res.data);
    console.log(res);
    setAlarm(prevAlarm => [...prevAlarm, notification]);
    // dispatch(addNotification(notification)); // 알림 추가 액션 디스패치
    //   setAlarm((prevAlarm = []) => {
    //     // 같은 알람이 이미 존재하는지 검사
    //     const isDuplicate = prevAlarm.some(
    //       (alarm) => alarm.content === notification.content && alarm.alarmType === notification.alarmType
    //     );

    //     // 중복이 아니라면, 이전 알람 목록에 새 알람을 추가
    //     if (!isDuplicate) {
    //       return [...prevAlarm, notification];
    //     }

    //     // 중복이라면, 이전 알람 상태를 그대로 반환 (상태 변경 없음)
    //     return prevAlarm;
    //   });
    // };
  };

  eventSource.onerror = error => {
    console.error('EventSource failed:', error);
    eventSource.close();
  };

  return {
    alarm,
    cleanup: () => eventSource.close(),
  };
}
