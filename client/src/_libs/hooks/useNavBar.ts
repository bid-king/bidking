import React, { useState, useRef, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { useAppSelector } from '../../store/hooks';
import member from '../../api/member';
import { useNavigate } from 'react-router-dom';
import { ROOT } from '../util/http';

export function useNavBar() {
  const { isLogined, accessToken, id } = useAppSelector(state => state.user);
  const [showModal, setShowModal] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const AlarmTimer = useRef<NodeJS.Timeout | null>(null);
  const [showAlarm, setAlarm] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const handleMouseEnter = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setShowModal(true);
  };

  const handleMouseLeave = () => {
    timer.current = setTimeout(() => {
      setShowModal(false);
    }, 300);
  };

  const handleAlarmMouseEnter = () => {
    if (AlarmTimer.current) {
      clearTimeout(AlarmTimer.current);
    }
    setAlarm(true);
  };

  const handleAlarmMouseLeave = () => {
    AlarmTimer.current = setTimeout(() => {
      setAlarm(false);
    }, 300);
  };

  useEffect(() => {
    if (id && isLogined) {
      member
        .get(id, accessToken)
        .then(data => {
          if (data.imageUrl === '') {
            setImgSrc('/image/profile.png');
          } else {
            setImgSrc(data.imageUrl);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [id, isLogined, imgSrc]);

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

  const eventSourceRef = useRef<EventSource | null>(null);
  useEffect(() => {
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
  }, []);

  return {
    showModal,
    isLogined,
    handleMouseEnter,
    handleMouseLeave,
    showAlarm,
    handleAlarmMouseEnter,
    handleAlarmMouseLeave,
    imgSrc,
    accessToken,
    keyword,
    handleKeyword,
    searchKeyword,
    id,
    searchClickKeyword,
    eventSourceRef,
  };
}
