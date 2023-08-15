/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import colors from '../../design/colors';
import { Text } from '../common/Text';
import { ProfileImage } from '../common/ProfileImage';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { Checkbox } from '../common/Checkbox';
import { Spacing } from '../common/Spacing';
import alarm, { AlarmResponse, ReadRequest } from '../../../api/alarm';
import { auctionDateParse } from '../../util/auctionDateParse';

export function AlarmBox({ theme = 'light' }: Props) {
  const { id, accessToken, isLogined } = useAppSelector(state => state.user);
  const [error, setError] = useState('');
  const [alarmList, setAlarmList] = useState<AlarmResponse[]>([]);
  useEffect(() => {
    if (isLogined) {
      alarm
        .get(accessToken)
        .then(res => {
          setAlarmList(res);
        })
        .catch(err => {
          setError(err);
        });
    }
  }, []);

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

  return (
    <div
      css={{
        margin: '1rem',
        borderRadius: '0.5rem',
        padding: '1rem',

        ...THEME_VARIANT[theme],
      }}
    >
      <div
        className="nickName"
        css={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Text type="h2" content="알림" />
      </div>
      <Spacing rem="1" />

      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {alarmList.map(alarm => {
          return (
            <div key={alarm.id}>
              <div
                css={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Text type="bold" content={auctionDateParse(alarm.createdTime)} />
                <Spacing rem="1" dir="h" />
                <div
                  css={{
                    color: ALARM_VARIANT[alarm.alarmType].color,
                  }}
                >
                  <Text
                    type="bold"
                    content={`[${ALARM_VARIANT[alarm.alarmType].text}]`}
                    css={{ textDecoration: alarm.isRead ? 'line-through' : 'none' }}
                  />
                </div>
                <Spacing rem="0.25" dir="h" />
                <Text type="bold" content={alarm.content} />
                <Spacing rem="1" dir="h" />
                <Checkbox
                  theme={theme}
                  id="1"
                  value="cheked"
                  onChange={() => alarmCheck(alarm.id)}
                  checked={alarm.isRead}
                />
              </div>
              <Spacing rem="1" />
            </div>
          );
        })}
        {alarmList.length === 0 && (
          <div>
            <div
              css={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Text type="bold" content="알림이 존재하지 않습니다." />
              <Spacing rem="1" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface Props {
  theme: 'light' | 'dark';
}

const THEME_VARIANT = {
  light: {
    backgroundColor: colors.backgroundLight2,
    border: `1px solid ${colors.backgroundLight}`,
  },
  dark: {
    backgroundColor: colors.backgroundDark2,
    color: colors.white,
  },
};

const ALARM_VARIANT = {
  AUCTION: { text: '경매', color: colors.confirm },
  ORDER: { text: '경매', color: colors.ok },
  DELIVERY: { text: '경매', color: colors.progress },
};
