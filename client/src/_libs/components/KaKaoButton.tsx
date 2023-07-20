import React from 'react';
import { HTMLAttributes } from 'react';
import colors from '../design/colors';

export function KaKaoButton() {
  const KAKAO_CLIENT_ID = `${process.env.REACT_APP_KAKAO_CLIENT_ID}`;
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/user/kakao/callback&response_type=code`;
  return (
    <>
      <a href={KAKAO_AUTH_URI}>
        <h3>카카오 계정으로 로그인</h3>
      </a>
    </>
  );
}
