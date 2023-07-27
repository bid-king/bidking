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

export function Nav({ theme = 'light' }: Props) {
  const breakpoints = [576, 768, 992, 1200];
  const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);
  return (
    <nav
      css={{
        display: 'flex',
        height: '3rem',
        alignItems: 'center',
        padding: '0.5rem 0 0.5rem 0',
        ...THEME_VARIANTS[theme],
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
        {theme === 'light' && (
          <Link to={'/seller'}>
            <RoundButton label="판매" size="small" variant="white" />
          </Link>
        )}
        <Spacing rem="0.5" dir="h" />
        <Link css={{}} to={'/mypage/:name'}>
          <RoundButton label="내 경매" size="small" variant="white" />
        </Link>
        <Spacing rem="1" dir="h" />
        <img src={`/image/Bell_${theme}.png`} alt="bell" />
        <Spacing rem="1" dir="h" />
        <ProfileImage />
        <Spacing rem="2" dir="h" />
      </div>
    </nav>
  );
}

const THEME_VARIANTS = {
  light: {
    backgroundColor: colors.backgroundLight2,
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
