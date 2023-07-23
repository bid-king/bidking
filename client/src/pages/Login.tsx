/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
// import { KakaoButton } from '../_libs/components/common/KakaoButton';
import { LoginBox } from '../_libs/components/common/LoginBox';

export function Login() {
  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '91.5vh',
      }}
    >
      {/* <KakaoButton /> */}
      <LoginBox />
    </div>
  );
}
