import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent, useRef } from 'react';
import member from '../../api/member';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUserInformation } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const dispatch = useAppDispatch();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorOccured, setErrorOccured] = useState(false);
  const idRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (idRef.current) {
      idRef.current.focus();
    }
  }, []);

  const navigate = useNavigate();

  function handleUserIdChange(e: ChangeEvent<HTMLInputElement>) {
    setUserId(e.target.value.trim());
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (userId && password) {
      member
        .login(userId, password)
        .then(res => {
          dispatch(
            setUserInformation({
              id: res.id,
              accessToken: res.accessToken,
              isLogined: true,
              nickname: res.nickname,
              refreshToken: res.refreshToken,
            })
          );
          navigate('/');
        })
        .catch(err => {
          if (err.response?.data.message) {
            setErrorMessage(err.response?.data.message);
            setErrorOccured(true);
          }
        });
    }
  }
  return {
    userId,
    password,
    handleUserIdChange,
    handlePasswordChange,
    handleSubmit,
    errorMessage,
    isErrorOccured,
    idRef,
  };
}
