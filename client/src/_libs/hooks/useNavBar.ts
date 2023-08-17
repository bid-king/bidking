import React, { useState, useRef, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { useAppSelector } from '../../store/hooks';
import member from '../../api/member';
import { useNavigate } from 'react-router-dom';
import { ROOT } from '../util/http';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

export function useNavBar() {
  const { isLogined, accessToken, id } = useAppSelector(state => state.user);
  const [showModal, setShowModal] = useState(false);
  const [showAlarm, setAlarm] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [profileError, setProfileError] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);
  const alarmRef = useRef<HTMLDivElement>(null);

  const profileClick = () => {
    setShowModal(prevState => !prevState); // 프로필 모달의 상태를 토글
    setAlarm(false); // 알람 모달을 비활성화
  };

  const alarmClick = () => {
    setAlarm(prevState => !prevState); // 알람 모달의 상태를 토글
    setShowModal(false); // 프로필 모달을 비활성화
  };

  const location = useLocation();
  useEffect(() => {
    setAlarm(false);
    setShowModal(false);
  }, [isLogined, location]);

  const getProfileImage = () => {
    if (id && isLogined) {
      return member.get(id, accessToken);
    }
    return null; // 명시적으로 null 반환
  };

  const { data, isError } = useQuery(['profileImage', location.pathname], getProfileImage, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setImgSrc(data.imageUrl);
    }
    if (isError) {
      setProfileError('이미지를 불러오는 실패했습니다.');
    }
  }, [data, isError]);

  // 검색
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const handleKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const searchKeyword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?search=${keyword}`);
    }
  };

  const searchClickKeyword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?search=${keyword}`);
    }
  };

  // 이벤트 소스 알람
  const eventSourceRef = useRef<EventSource | null>(null);
  useEffect(() => {
    if (isLogined) {
      eventSourceRef.current = new EventSource(`${ROOT}/api/v1/alarms/subscribe/${id}`);

      eventSourceRef.current.onmessage = function (event) {
        console.log(event.data);
      };

      eventSourceRef.current.onerror = function (error) {
        console.error('EventSource failed:', error);
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
        }
      };

      // 컴포넌트가 언마운트될 때 EventSource 해제
      return () => {
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
        }
      };
    }
  }, []);

  return {
    showModal,
    isLogined,
    profileClick,
    alarmClick,
    showAlarm,
    imgSrc,
    accessToken,
    keyword,
    handleKeyword,
    searchKeyword,
    setKeyword,
    id,
    searchClickKeyword,
    eventSourceRef,
    profileRef,
    alarmRef,
  };
}
