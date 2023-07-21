import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { getUserInformation } from '../store/slices/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function LoginLoading() {
  const [searchParams, setSearchParams] = useSearchParams();
  const code: string | null = searchParams.get('code');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loginProgress = async () => {
      if (code) {
        await dispatch(getUserInformation(code));
        navigate('/');
      }
    };
    loginProgress();
  }, [code]);

  return (
    <div>
      <h3>로딩중입니다.</h3>
    </div>
  );
}
