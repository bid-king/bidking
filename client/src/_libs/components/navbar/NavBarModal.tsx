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

export function NavBarModal() {
  return (
    <div
      css={{
        background: colors.backgroundLight,
        margin: '1rem',
        borderRadius: '0.5rem',
        padding: '1rem',
      }}
    >
      <div
        className="nickName"
        css={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div css={{ marginRight: '1rem', width: '3.375rem', height: '3.375rem' }}>
          <ProfileImage />
        </div>
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
        <Text type="bold" content="개인정보 수정" />
        <Text type="bold" content="로그아웃" />
      </div>
    </div>
  );
}
