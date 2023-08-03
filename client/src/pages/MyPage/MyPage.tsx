/** @jsxImportSource @emotion/react */
import React from 'react';
import { MyPageBox } from './MyPageBox';
import colors from '../../_libs/design/colors';

export function MyPage() {
  return (
    <div
      css={{
        backgroundColor: colors.backgroundLight,
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <MyPageBox />
    </div>
  );
}
