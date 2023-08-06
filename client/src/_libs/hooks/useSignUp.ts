import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import member from '../../api/member';

export function useSignUp() {
  const [step, setStep] = useState('nickname');
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [certificateCode, setCertificateCode] = useState('');
  const [street, setStreet] = useState('');
  const [details, setDetails] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isPhoneValid, setPhoneValid] = useState(false);
  const [isVerificationVisible, setVerificationVisible] = useState(false);
  const [isRequestCerificated, setRequestCerificated] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isIdDuplicated, setIsIdDuplicated] = useState(false);
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [certifiedNumber, setCertifiedNumber] = useState('');
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    if (step === 'nickname' && nickname !== '' && !isNicknameDuplicated) {
      setStep('id');
    } else if (step === 'id' && userId !== '' && !isIdDuplicated) {
      setStep('password');
    } else if (step === 'password') {
      setStep('password-again');
    } else if (step === 'password-again' && password === passwordConfirmation) {
      setStep('phone-number');
    } else if (step === 'phone-number' && isRequestCerificated) {
      setStep('address');
    } else if (step === 'address' && street !== '' && details !== '' && zipCode !== '') {
      member
        .signup(userId, password, nickname, phoneNumber, { street, details, zipCode })
        .then(res => {
          setSuccess(true);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const checkIdDuplication = async (userId: string) => {
    if (userId) {
      member
        .idValidate({ userId })
        .then(res => {
          setIsIdDuplicated(res.duplicated);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const checkNicknameDuplication = async (nickname: string) => {
    if (nickname) {
      member
        .nicknameValidate({ nickname })
        .then(res => {
          setIsNicknameDuplicated(res.duplicated);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  // 인증번호 요청 함수
  const requestVerification = () => {
    if (phoneNumber && isPhoneValid) {
      member
        .phoneVerification({ phoneNumber })
        .then(res => {
          setCertifiedNumber(res.certifiedNumber);
          setVerificationVisible(true);
        })
        .catch(err => {
          console.log(err);
          setIsPhoneError(true);
          setPhoneErrorMessage(err.response.data.message);
        });
    }
  };

  // 인증번호 확인 함수
  const requestCerificated = () => {
    if (certificateCode) {
      if (certificateCode === certifiedNumber) {
        setRequestCerificated(true);
      }
    }
  };

  // 비밀번호 유효성 체크
  useEffect(() => {
    const passwordRegex = /^.{8,16}$/;
    setPasswordValid(passwordRegex.test(password));
  }, [password]);

  // 핸드폰번호 유효성 체크(변경 가능)
  useEffect(() => {
    const phoneRegex = /^\d{10,11}$/;
    setPhoneValid(phoneRegex.test(phoneNumber));
  }, [phoneNumber]);

  // 휴대폰 본인인증 버튼 활성화 체크
  useEffect(() => {
    if (isRequestCerificated && isVerificationVisible && isPhoneValid) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [isRequestCerificated, isVerificationVisible, isPhoneValid]);

  // 인풋값 관리
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

  const handleCertificateCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCertificateCode(e.target.value.trim());
  };

  const handleStreetChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value.trim());
  };

  const handleDetailsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDetails(e.target.value.trim());
  };

  const handleZipCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value.trim());
  };

  return {
    step,
    handleNextStep,
    handleUserIdChange,
    handlePasswordChange,
    handlePasswordConfirmationChange,
    handlePhoneChange,
    street,
    details,
    zipCode,
    isPhoneValid,
    password,
    passwordConfirmation,
    handleStreetChange,
    handleDetailsChange,
    handleZipCodeChange,
    isVerificationVisible,
    isRequestCerificated,
    isButtonDisabled,
    requestVerification,
    requestCerificated,
    userId,
    isIdDuplicated,
    isNicknameDuplicated,
    handleUserIdBlur,
    nickname,
    handleNicknameChange,
    handleNicknameBlur,
    handleCertificateCode,
    isSuccess,
    isPhoneError,
    phoneErrorMessage,
    isPasswordValid,
  };
}
