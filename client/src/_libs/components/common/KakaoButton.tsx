/** @jsxImportSource @emotion/react */
import React from 'react';

export function KakaoButton() {
  const KAKAO_CLIENT_ID = `${process.env.REACT_APP_KAKAO_CLIENT_ID}`;
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/login/loading`;

  return (
    <>
      <a href={KAKAO_AUTH_URI}>
        <img
          css={{
            // width: '366px',
            // height: '90px',
            transition: 'filter 0.3s',
            '&:hover': {
              filter: 'brightness(0.9)',
            },
          }}
          src="/image/kakao_login_large_narrow.png"
          alt="asd"
        />
      </a>
    </>
  );
}
