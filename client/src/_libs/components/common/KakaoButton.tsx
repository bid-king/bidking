/** @jsxImportSource @emotion/react */
import React from 'react';

export function KakaoButton() {
  const KAKAO_CLIENT_ID = `${process.env.REACT_APP_KAKAO_CLIENT_ID}`;
  const KAKAO_AUTH_URI = 'http://70.12.247.192:8080/api/v1/oauth/KAKAO';

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
          src="/image/kakao_login/kakao_login_large_narrow.png"
          alt="asd"
        />
      </a>
    </>
  );
}
