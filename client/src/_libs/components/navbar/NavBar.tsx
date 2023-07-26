/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../design/colors';
import { Text } from '../common/Text';
import { Input } from '../common/Input';
import { RoundButton } from '../common/RoundButton';
import { Link } from 'react-router-dom';
import { ProfileImage } from '../common/ProfileImage';
import { NavBarModal } from './NavBarModal';
import { useNavBar } from '../../hooks/useNavBar';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
}

export function NavBar({ theme = 'light' }: Props) {
  const breakpoints = [576, 768, 992, 1200];
  const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

  const { showModal, setShowModal, isLogined } = useNavBar();

  return (
    <div>
      <nav
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
          ...THEME_VARIANTS[theme],
        }}
      >
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="logo">
            <Link to={'/'}>
              <img
                css={{
                  width: '4rem',
                  height: '4rem',
                }}
                src="/image/logo/logo_light.png"
                alt=""
              />
            </Link>
          </div>
          <div
            css={{
              marginLeft: '1.5rem',
              marginRight: '1.5rem',
            }}
          >
            {theme === 'dark' && (
              <div css={{ color: colors.white }}>
                <Text type="h3" content="판매" />
              </div>
            )}
          </div>
          <div
            css={{
              marginRight: '1.5rem',
              // 미디어 쿼리 사용설정만 해놓음 적용 x
              [mq[3]]: {
                width: '934px',
              },
              [mq[2]]: {
                width: '600px',
              },
            }}
          >
            <Input shape="round" theme={theme} placeholder="경매방을 검색하세요" />
          </div>
          <div>
            <RoundButton label="검색" />
          </div>
        </div>

        <div
          css={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {theme === 'light' && (
            <Link
              css={{
                marginRight: '1.5rem',
              }}
              to={'/seller'}
            >
              판매
            </Link>
          )}
          {theme === 'dark' && (
            <Link
              css={{
                color: 'white',
                marginRight: '1.5rem',
              }}
              to={'/'}
            >
              구매
            </Link>
          )}
          {!isLogined && (
            <div
              css={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <Link
                css={{
                  marginRight: '1rem',
                }}
                to={'/login'}
              >
                <RoundButton variant="white" label="로그인" />
              </Link>
              <Link to={'/signup'}>
                <RoundButton label="회원가입" />
              </Link>
            </div>
          )}

          {isLogined && (
            <div
              css={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <Link
                css={{
                  marginRight: '1.5rem',
                }}
                to={'/mypage/:name'}
              >
                내 경매
              </Link>
              <div
                css={{
                  marginRight: '1.5rem',
                }}
              >
                <img src={`/image/Bell_${theme}.png`} alt="bell" />
              </div>
              <div
                onMouseEnter={() => setShowModal(true)}
                onMouseLeave={() => setShowModal(false)}
                css={{
                  width: '3.375rem',
                  height: '3.375rem',
                }}
              >
                <ProfileImage />
              </div>
            </div>
          )}
        </div>
      </nav>
      <div
        css={{
          position: 'absolute',
          right: 0,
          zIndex: 1,
          opacity: showModal ? '1' : '0',
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        <NavBarModal />
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: {
    backgroundColor: colors.backgroundLight,
  },
  dark: {
    backgroundColor: colors.backgroundDark,
    color: colors.white,
  },
};

const SEARCH_VARIANTS = {
  light: {
    backgroundColor: colors.backgroundLight2,
  },
  dark: {
    backgroundColor: colors.backgroundDark2,
    color: colors.white,
  },
};
