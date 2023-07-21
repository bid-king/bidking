import React, { useEffect } from 'react';
import { KakaoButton } from '../_libs/components/KakaoButton';
import { useSearchParams } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../store/hooks';

export function Login() {
  return (
    <div>
      <KakaoButton />
    </div>
  );
}
