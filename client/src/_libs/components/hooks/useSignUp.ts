import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import member from '../../../api/member';

export function useSignUp() {
  const [step, setStep] = useState('userName');
  const [userName, setUserName] = useState('');
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isPhoneValid, setPhoneValid] = useState(false);
  const [isVerificationVisible, setVerificationVisible] = useState(false);
  const [isRequestCerificated, setRequestCerificated] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isIdDuplicated, setIsIdDuplicated] = useState(false);
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false);

  const checkIdDuplication = async (userId: string) => {
    if (userId) {
      try {
        const data = await member.idValidate({ userId });
        setIsIdDuplicated(data.duplicated);
        console.log(data.duplicated);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const checkNicknameDuplication = async (nickname: string) => {
    if (userId) {
      axios
        .post(`${API_URL}/api/v1/members/check/userId`, { nickname })
        .then(res => {
          setIsNicknameDuplicated(res.data.duplicated);
          console.log(res.data.duplicated);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  // 핸드폰번호 유효성 체크(변경 가능)
  useEffect(() => {
    const phoneRegex = /^\d{10,11}$/;
    setPhoneValid(phoneRegex.test(phoneNumber));
  }, [phoneNumber]);

  // 휻대폰 본인인증 버튼 활성화 체크
  useEffect(() => {
    if (isRequestCerificated && isVerificationVisible && isPhoneValid) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [isRequestCerificated, isVerificationVisible, isPhoneValid]);

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value.trim());
  };
  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value.trim());
  };

  const handleNicknameBlur = () => {
    checkNicknameDuplication(nickname);
  };

  const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value.trim());
  };

  const handleUserIdBlur = () => {
    checkIdDuplication(userId);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.target.value.trim());
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value.trim());
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value.trim());
  };

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    if (step === 'userName' && userName !== '') {
      setStep('nickname');
    } else if (step === 'nickname' && nickname !== '' && !isNicknameDuplicated) {
      setStep('id');
    } else if (step === 'id' && userId !== '' && !isIdDuplicated) {
      setStep('password');
    } else if (step === 'password') {
      setStep('password-again');
    } else if (step === 'password-again' && password === passwordConfirmation) {
      setStep('phone-number');
    } else if (step === 'phone-number' && isPhoneValid) {
      setStep('address');
    } else if (step === 'address' && address !== '') {
      axios
        .post(`${API_URL}/api/v1/members/signup`, {
          userId: userId,
          password: password,
          name: userName,
          nickname: nickname,
          phoneNumber: phoneNumber,
          address: {
            street: '광교호수로 15',
            details: '주소 상세 설명',
            zipCode: '32423',
          },
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  // 인증번호 요청 함수
  const requestVerification = () => {
    setVerificationVisible(true);
  };

  // 인증번호 확인 함수
  const requestCerificated = () => {
    setRequestCerificated(true);
  };

  return {
    step,
    handleNextStep,
    handleUserIdChange,
    handlePasswordChange,
    handlePasswordConfirmationChange,
    handlePhoneChange,
    handleAddressChange,
    isPhoneValid,
    password,
    passwordConfirmation,
    address,
    isVerificationVisible,
    isRequestCerificated,
    isButtonDisabled,
    requestVerification,
    requestCerificated,
    userId,
    isIdDuplicated,
    handleUserIdBlur,
    nickname,
    handleNicknameChange,
    handleNicknameBlur,
    handleUserNameChange,
  };
}
