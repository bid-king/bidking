/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { KakaoButton } from '../_libs/components/common/KakaoButton';
import { useSearchParams } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Spacing } from '../_libs/components/common/Spacing';

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
      <KakaoButton />
    </div>
  );
}
