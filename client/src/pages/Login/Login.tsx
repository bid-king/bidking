/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
// import { KakaoButton } from '../_libs/components/common/KakaoButton';
import { LoginBox } from './LoginBox';
import colors from '../../_libs/design/colors';

export function Login() {
  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '94vh',
        backgroundColor: colors.backgroundLight,
      }}
    >
      <LoginBox />
    </div>
  );
}
