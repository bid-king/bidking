import { useState, ChangeEvent, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import alarm, { AlarmResponse } from '../../api/alarm';
import { ReadRequest } from '../../api/alarm';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

export function useAlarm() {
  const { id, accessToken, isLogined } = useAppSelector(state => state.user);
  const [error, setError] = useState('');
  const [alarmList, setAlarmList] = useState<AlarmResponse[]>([]);

  const alarmCheck = (alarmId: number) => {
    if (id && isLogined) {
      setAlarmList(prevAlarms => {
        return prevAlarms.map(alarm => {
          if (alarm.id === alarmId) {
            return {
              ...alarm,
              isRead: true,
            };
          }
          return alarm;
        });
      });

      const data: ReadRequest = {
        alarmId,
      };
      alarm
        .post(id, data, accessToken)
        .then(res => {})
        .catch(err => {});
    }
  };

  // useEffect(() => {
  //   if (isLogined) {
  //     alarm
  //       .get(accessToken)
  //       .then(res => {
  //         setAlarmList(res);
  //       })
  //       .catch(err => {
  //         setError(err);
  //       });
  //   }
  // }, [isLogined]);

  //       const data: ReadRequest = {
  //       alarmId,
  //     };
  //     alarm
  //       .post(id, data, accessToken)
  //       .then(res => {})
  //       .catch(err => {});
  //   }
  // };

  const location = useLocation();
  const getAlarms = () => {
    return alarm.get(accessToken);
  };

  const { data, isError } = useQuery('alarms', getAlarms, {
    enabled: isLogined,
    refetchInterval: 5000,
  });
  useEffect(() => {
    if (data) {
      setAlarmList(data);
    }

    if (isError) {
      setError('알람을 불러오는데 실패했습니다.');
    }
  }, [data, isError]);

  return {
    id,
    error,
    alarmList,
    isLogined,
    alarmCheck,
  };
}
