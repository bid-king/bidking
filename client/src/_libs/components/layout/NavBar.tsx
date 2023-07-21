/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../design/colors';
import bid from '../static/bid.jpg';
import { Text } from '../common/Text';
import { Spacing } from '../common/Spacing';
import { Input } from '../common/Input';
import { RoundButton } from '../common/RoundButton';
import { Link } from 'react-router-dom';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
}

export function NavBar({ theme = 'light' }: Props) {
  const breakpoints = [576, 768, 992, 1200];

  const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        height: '4.5rem',
        ...THEME_VARIANTS[theme],
      }}
    >
      <Spacing rem="2" dir="h" />
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
      <Spacing rem="2" dir="h" />
      <div>
        <Text type="h3" content="판매" />
      </div>
      <Spacing rem="2" dir="h" />
      <div
        css={{
          width: '937px',
        }}
      >
        <Input shape="round" theme="light" placeholder="경매방을 검색하세요" />
      </div>
      <div
        css={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Spacing rem="2" dir="h" />
        <Link to={'/mypage/:name'}>내 경매</Link>
        <Spacing rem="2" dir="h" />
        <RoundButton label="검색" />
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
