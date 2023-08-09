import { useState, useRef } from 'react';
import { useAppSelector } from '../../store/hooks';

export function useNavBar() {
  const isLogined = useAppSelector(state => state.user.isLogined);
  const [showModal, setShowModal] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const AlarmTimer = useRef<NodeJS.Timeout | null>(null);
  const [showAlarm, setAlarm] = useState(false);

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
  return {
    showModal,
    setShowModal,
    isLogined,
    handleMouseEnter,
    handleMouseLeave,
    showAlarm,
    handleAlarmMouseEnter,
    handleAlarmMouseLeave,
  };
}
