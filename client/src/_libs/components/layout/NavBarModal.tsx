/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../../design/colors';
import { Text } from '../common/Text';
import { ProfileImage } from '../common/ProfileImage';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';

export function NavBarModal({ theme = 'light' }: Props) {
  const id = useAppSelector(state => state.user.id);
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
        <Text type="h2" content="NickName" />
      </div>
      <div
        className="dashBoard"
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          margin: '1rem',
        }}
      >
        대쉬보드 컴포넌트
      </div>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Link to={`/mypage/${id}`}>
          <Text type="bold" content="개인정보 수정" />
        </Link>
        <Link to={'/'}>
          <Text type="bold" content="로그아웃" />
        </Link>
      </div>
    </div>
  );
}

interface Props {
  theme: 'light' | 'dark';
}

const THEME_VARIANT = {
  light: {
    backgroundColor: colors.backgroundLight,
  },
  dark: {
    backgroundColor: colors.backgroundDark2,
    color: colors.white,
  },
};
