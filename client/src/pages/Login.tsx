import React, { useEffect } from 'react';
import axios from 'axios';
import { KaKaoButton } from '../_libs/components/KaKaoButton';
import { useSearchParams } from 'react-router-dom';
import { checkMyName } from '../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');
  console.log(code);

  const dispatch = useAppDispatch();
  const name = useAppSelector(state => state);
  console.log(name);

  function kakaoLogin(code: string) {
    const LoginUrl = 'http://116.33.177.60:8080/req_post';
    axios
      .post(LoginUrl, { code })
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
      <button onClick={() => dispatch(checkMyName())}>서버로 요청</button>
    </div>
  );
}
