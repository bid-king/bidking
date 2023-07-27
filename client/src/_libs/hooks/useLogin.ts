import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import member from '../../api/member';
import { useAppDispatch } from '../../store/hooks';
import { getUserInformation } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const API_URL = 'http://70.12.247.172:8080';
  const dispatch = useAppDispatch();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorOccured, setErrorOccured] = useState(false);

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
      axios
        .post(`${API_URL}/api/v1/members/login`, {
          userId: userId,
          password: password,
        })
        .then(res => {
          dispatch(getUserInformation({ userId, accessToken: res.data.accessToken, isLogined: true }));
          navigate('/');
        })
        .catch(err => {
          if (err) {
            setErrorMessage(err.response.data.message);
            setErrorOccured(true);
          }
        });
    }
  }
  return { userId, password, handleUserIdChange, handlePasswordChange, handleSubmit, errorMessage, isErrorOccured };
}
