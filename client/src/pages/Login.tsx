import React, { useEffect } from 'react';
import axios from 'axios';
import { KaKaoButton } from '../_libs/components/KaKaoButton';
import { useSearchParams } from 'react-router-dom';

export function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');
  console.log(code);
  const Loginurl = 'http://70.12.247.192:8080/api/v1/oauth/test';

  function kakaoLogin() {
    axios
      .post(Loginurl, { code })
      // .get(Loginurl)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <KaKaoButton />
      <button onClick={kakaoLogin}>서버로 요청</button>
    </div>
  );
}
