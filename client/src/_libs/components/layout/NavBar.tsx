/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../design/colors';
import { Text } from '../common/Text';
import { Spacing } from '../common/Spacing';
import { Input } from '../common/Input';
import { RoundButton } from '../common/RoundButton';
import { Link } from 'react-router-dom';
import { ProfileImage } from '../common/ProfileImage';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
}

export function NavBar({ theme = 'light' }: Props) {
  const breakpoints = [576, 768, 992, 1200];
  const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);
  return (
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
        <div>
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
          {theme === 'light' ? <Text type="h3" content="판매" /> : null}
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
          <Input shape="round" theme="light" placeholder="경매방을 검색하세요" />
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
        <div>
          <ProfileImage />
        </div>
      </div>
    </nav>
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
