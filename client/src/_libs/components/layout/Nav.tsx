/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../design/colors';
import { Text } from '../common/Text';
import { Spacing } from '../common/Spacing';
import { Input } from '../common/Input';
import { RoundButton } from '../common/RoundButton';
import { Link } from 'react-router-dom';
import { ProfileImage } from '../common/ProfileImage';
import { Icon } from '../common/Icon';
import { useNavBar } from '../../hooks/useNavBar';
import { NavBarModal } from './NavBarModal';
import { AlarmBox } from './AlarmBox';
import { useAppSelector } from '../../../store/hooks';
import { ROOT } from '../../util/http';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
}

export function Nav({ theme = 'light' }: Props) {
  const breakpoints = [576, 768, 992, 1200];
  const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);
  const id = useAppSelector(state => state.user.id);
  const {
    showModal,
    isLogined,
    handleMouseEnter,
    handleMouseLeave,
    showAlarm,
    handleAlarmMouseEnter,
    handleAlarmMouseLeave,
  } = useNavBar();

  // type AlarmEvent = {
  //   content: string;
  //   alarmType: string;
  // };
  // const [alarm, setAlarm] = useState<AlarmEvent[]>([]);

  // if (isLogined) {
  //   const eventSource = new EventSource(`${ROOT}/api/v1/alarms/subscribe/${id}`);
  //   eventSource.onopen = e => {
  //     console.log(e);
  //   };

  //   eventSource.onmessage = res => {
  //     console.log('1111111111');
  //     console.log(res);
  //     const notification: AlarmEvent = JSON.parse(res.data);
  //     console.log(notification);
  //   };

  //   eventSource.onerror = error => {
  //     console.error('EventSource failed:', error);
  //     eventSource.close();
  //   };
  // }

  return (
    <div>
      <nav
        css={{
          display: 'flex',
          height: '3rem',
          alignItems: 'center',
          padding: '0.5rem 0 0.5rem 0',
          ...THEME_VARIANT[theme],
        }}
      >
        <Spacing rem="2" dir="h" />
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="logo">
            <Link to={'/'}>입찰왕</Link>
          </div>

          <div>
            {theme === 'dark' && (
              <div css={{ color: colors.white }}>
                <Text type="h3" content="판매" />
              </div>
            )}
          </div>
          <Spacing rem="1" dir="h" />
          <div css={{ display: 'flex' }}>
            <div>
              <Input shape="round" theme={theme} placeholder="경매방을 검색하세요" size="small" />
            </div>
            <Spacing rem="0.5" dir="h" />
            <div>
              <RoundButton label="검색" size="small" />
            </div>
          </div>
        </div>
        <Spacing rem="1" dir="h" />
        <div
          css={{
            position: 'absolute',
            right: '0',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {!isLogined && (
            <>
              <Link to={'/login'}>
                <RoundButton color="white" label="로그인" size="small" />
              </Link>
              <Spacing rem="0.5" dir="h" />
              <Link to={'/signup'}>
                <RoundButton label="회원가입" size="small" />
              </Link>
              <Spacing rem="1" dir="h" />
            </>
          )}
          {isLogined && (
            <>
              {theme === 'light' && (
                <Link to={'/seller'}>
                  <RoundButton label="판매" size="small" color="white" />
                </Link>
              )}
              <Spacing rem="0.5" dir="h" />
              <Link css={{}} to={`/purchased/${id}`}>
                <RoundButton label="내 경매" size="small" color="white" />
              </Link>
              <Spacing rem="2" dir="h" />
              <div onMouseEnter={handleAlarmMouseEnter} onMouseLeave={handleAlarmMouseLeave}>
                <Icon type="noti" color="black" rem="1.5" />
              </div>
              <Spacing rem="1" dir="h" />
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <ProfileImage />
              </div>
              <Spacing rem="2" dir="h" />
            </>
          )}
        </div>
      </nav>
      {showModal && (
        <div
          css={{
            position: 'absolute',
            right: 0,
            zIndex: 1,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <NavBarModal theme={theme} />
        </div>
      )}
      {showAlarm && (
        <div
          css={{
            position: 'absolute',
            right: 0,
            zIndex: 1,
          }}
          onMouseEnter={handleAlarmMouseEnter}
          onMouseLeave={handleAlarmMouseLeave}
        >
          <AlarmBox theme={theme} />
        </div>
      )}
    </div>
  );
}

const THEME_VARIANT = {
  light: {
    backgroundColor: colors.backgroundLight,
  },
  dark: {
    backgroundColor: colors.backgroundDark,
    color: colors.white,
  },
};
