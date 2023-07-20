import React from 'react';
import axios from 'axios';
import { KaKaoButton } from '../_libs/components/KaKaoButton';

export function Login() {
  function kakaoLogin() {
    console.log('카카오로그인 클릭');
  }

  return (
    <div>
      <KaKaoButton />
    </div>
  );
}
