/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
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
import { useAlarm } from '../../hooks/useAlarm';
import { Image } from '../common/Image';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
}

export function Nav({ theme = 'light' }: Props) {
  const breakpoints = [576, 768, 992, 1200];
  const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);
  const { error, alarmList, alarmCheck } = useAlarm();
  const [unreadAlarmsCount, setUnreadAlarmsCount] = useState(0);

  useEffect(() => {
    setUnreadAlarmsCount(alarmList.filter(alarm => !alarm.isRead).length);
  }, [alarmList]);

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
    setKeyword,
    id,
    searchClickKeyword,
    eventSourceRef,
  } = useNavBar();

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
            <div
              className="logo"
              css={{
                width: '5rem',
                height: '1rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Link to={'/'}>
                <Image src="/image/logo/logo_light.png" alt="dark-logo" />
              </Link>
            </div>
          )}
          {theme === 'dark' && (
            <div
              className="logo"
              css={{
                width: '5rem',
                height: '1rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Link to={'/seller'}>
                <Image src="/image/logo/logo_dark.png" alt="dark-logo" />
              </Link>
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
            <form
              css={{ display: 'flex' }}
              onSubmit={e => {
                searchKeyword(e);
                setKeyword('');
              }}
            >
              <div>
                <Input
                  shape="round"
                  theme={theme}
                  onChange={handleKeyword}
                  placeholder="경매나 상품을 검색하세요"
                  size="small"
                  value={keyword}
                />
              </div>
              <Spacing rem="0.5" dir="h" />
              <div>
                <RoundButton
                  onClick={e => {
                    searchClickKeyword(e);
                    setKeyword('');
                  }}
                  label="검색"
                  size="small"
                />
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
                <div
                  css={{
                    display: 'flex',
                  }}
                >
                  <Link to={`/purchased/${id}`}>
                    <RoundButton label="구매 내역" size="small" color="white" />
                  </Link>
                  <Spacing rem="0.5" dir="h" />
                  <Link to={'/seller'}>
                    <RoundButton label="판매하기" size="small" color="confirm" />
                  </Link>
                </div>
              )}
              {theme === 'dark' && (
                <div
                  css={{
                    display: 'flex',
                  }}
                >
                  <Link to={'/seller/create-auction'}>
                    <RoundButton label="경매 등록" size="small" color="white" />
                  </Link>
                  <Spacing rem="0.5" dir="h" />
                  <Link to={'/'}>
                    <RoundButton label="구매하기" size="small" color="confirm" />
                  </Link>
                </div>
              )}
              <Spacing rem="2" dir="h" />
              <div onMouseEnter={handleAlarmMouseEnter} onMouseLeave={handleAlarmMouseLeave}>
                <Icon type="noti" color={theme} rem="1.5" />
                {unreadAlarmsCount !== 0 && (
                  <div
                    css={{
                      width: '0.7rem',
                      height: '0.7rem',
                      borderRadius: '0.5rem',
                      backgroundColor: colors.warn,
                      position: 'absolute',
                      top: 6.6,
                      right: 77.5,
                      transform: 'translate(50%, -50%)',
                      opacity: '0.7',
                    }}
                  ></div>
                )}
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
          <AlarmBox theme={theme} alarmList={alarmList} alarmCheck={alarmCheck} eventSourceRef={eventSourceRef} />
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
