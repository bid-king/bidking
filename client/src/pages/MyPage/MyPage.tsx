/** @jsxImportSource @emotion/react */
import React from 'react';
import { MyPageBox } from './MyPageBox';
import colors from '../../_libs/design/colors';
import { Spacing } from '../../_libs/components/common/Spacing';

export function MyPage() {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '5rem',
        backgroundColor: colors.backgroundLight,
        minHeight: '94vh',
      }}
    >
      <Spacing rem="3" />
      <MyPageBox />
    </div>
  );
}
