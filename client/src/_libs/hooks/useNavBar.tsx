import { useState, useRef } from 'react';
import { useAppSelector } from '../../store/hooks';

export function useNavBar() {
  const isLogined = useAppSelector(state => state.user.isLogined);
  const [showModal, setShowModal] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null); // 이 timeout을 참조하기 위해 useRef를 사용합니다.

  const handleMouseEnter = () => {
    if (timer.current) {
      clearTimeout(timer.current); // 마우스가 다시 모달로 들어오면 timeout을 취소합니다.
    }
    setShowModal(true);
  };

  const handleMouseLeave = () => {
    timer.current = setTimeout(() => {
      // 마우스가 떠날 때 delay를 추가합니다.
      setShowModal(false);
    }, 300); // 이 경우 delay는 500ms입니다.
  };
  return {
    showModal,
    setShowModal,
    isLogined,
    handleMouseEnter,
    handleMouseLeave,
  };
}
