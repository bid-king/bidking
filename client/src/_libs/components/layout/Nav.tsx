/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useEffect, useState } from 'react';
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
import { ROOT } from '../../util/http';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
}

export function Nav({ theme = 'light' }: Props) {
  const breakpoints = [576, 768, 992, 1200];
  const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

  const {
    showModal,
    isLogined,
    handleMouseEnter,
    handleMouseLeave,
    showAlarm,
    handleAlarmMouseEnter,
    handleAlarmMouseLeave,
    imgSrc,
    keyword,
    handleKeyword,
    searchKeyword,
    id,
    searchClickKeyword,
  } = useNavBar();

  type AlarmEvent = {
    content: string;
    alarmType: string;
  };
  const [alarm, setAlarm] = useState<AlarmEvent[]>([]);

  useEffect(() => {
    if (isLogined) {
      const eventSource = new EventSource(`${ROOT}/api/v1/alarms/subscribe/${id}`);
      console.log(eventSource);
      eventSource.onmessage = function (event) {
        console.log(event);
      };

      return () => {
        eventSource.close();
      };
    }
  }, []);

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
          {theme === 'light' && (
            <div className="logo">
              <Link to={'/'}>입찰왕</Link>
            </div>
          )}
          {theme === 'dark' && (
            <div className="logo">
              <Link to={'/seller'}>입찰왕</Link>
            </div>
          )}

          <div>
            {theme === 'dark' && (
              <div css={{ color: colors.white }}>
                <Text type="h3" content="판매" />
              </div>
            )}
          </div>
          <Spacing rem="1" dir="h" />
          {theme === 'light' && (
            <form css={{ display: 'flex' }} onSubmit={searchKeyword}>
              <div>
                <Input
                  shape="round"
                  theme={theme}
                  onChange={handleKeyword}
                  placeholder="경매방을 검색하세요"
                  size="small"
                  value={keyword}
                />
              </div>
              <Spacing rem="0.5" dir="h" />
              <div>
                <RoundButton onClick={searchClickKeyword} label="검색" size="small" />
              </div>
            </form>
          )}
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
                <div>
                  <Link to={`/purchased/${id}`}>
                    <RoundButton label="구매 내역" size="small" color="white" />
                  </Link>
                  <Spacing rem="0.5" dir="h" />
                  <Link to={'/seller'}>
                    <RoundButton label="판매 모드" size="small" color="white" />
                  </Link>
                </div>
              )}
              {theme === 'dark' && (
                <div>
                  <Link to={'/seller/create-auction'}>
                    <RoundButton label="경매 등록" size="small" color="white" />
                  </Link>
                  <Spacing rem="0.5" dir="h" />
                  <Link to={'/'}>
                    <RoundButton label="구매 모드" size="small" color="white" />
                  </Link>
                </div>
              )}
              <Spacing rem="2" dir="h" />
              <div onMouseEnter={handleAlarmMouseEnter} onMouseLeave={handleAlarmMouseLeave}>
                <Icon type="noti" color={theme} rem="1.5" />
              </div>
              <Spacing rem="1" dir="h" />
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <ProfileImage src={imgSrc ? imgSrc : ''} />
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
