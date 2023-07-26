import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import member from '../../api/member';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';

export function useNavBar() {
  const [showModal, setShowModal] = useState(false);
  const isLogined = useAppSelector(state => state.user.isLogined);

  return {
    showModal,
    setShowModal,
    isLogined,
  };
}
