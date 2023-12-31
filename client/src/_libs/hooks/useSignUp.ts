import { useState, useEffect, useRef, ChangeEvent, FormEvent, KeyboardEvent, FocusEvent } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [certifiedErrMessage, setCertifiedErrMessage] = useState('');
  const [isCertificationDisabled, setIsCertificationDisabled] = useState(false);
  const [nicknameError, setNicknameError] = useState('');
  const [idError, setIdError] = useState('');
  const [error, setError] = useState(false);

  // 포커싱 로직
  const nicknameRef = useRef<HTMLInputElement | null>(null);
  const userIdRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement | null>(null);
  const phoneNumberRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (step === 'nickname' && nicknameRef.current) {
      nicknameRef.current.focus();
    } else if (step === 'id' && userIdRef.current) {
      userIdRef.current.focus();
    } else if (step === 'password' && passwordRef.current) {
      passwordRef.current.focus();
    } else if (step === 'password-again' && passwordConfirmationRef.current) {
      passwordConfirmationRef.current.focus();
    } else if (step === 'phone-number' && phoneNumberRef.current) {
      phoneNumberRef.current.focus();
    } else if (step === 'address' && addressRef.current) {
      addressRef.current.focus();
    }
  }, [step]);

  // 단계 로직
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
    } else if (step === 'address' && street !== '' && details !== '' && zipCode !== '' && zipCode.length === 5) {
      member
        .signup(userId, password, nickname, phoneNumber, { street, details, zipCode })
        .then(res => {
          setSuccess(true);
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        })
        .catch(err => {
          setError(true);
        });
    }
  };

  // 뒤로가기 로직
  const handlePrevStep = () => {
    if (step === 'id') {
      setStep('nickname');
    } else if (step === 'password') {
      setStep('id');
    } else if (step === 'password-again') {
      setStep('password');
    } else if (step === 'phone-number') {
      setStep('password-again');
    } else if (step === 'address') {
      setStep('phone-number');
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

  // 닉네임 중복검사
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
    setIsCertificationDisabled(true);
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
      setTimeout(() => {
        setIsCertificationDisabled(false);
      }, 10000);
    }
  };

  // 인증번호 확인 함수
  const requestCerificated = () => {
    if (certificateCode) {
      if (certificateCode === certifiedNumber) {
        setRequestCerificated(true);
        setVerificationVisible(false);
        setCertifiedErrMessage('');
        setPhoneErrorMessage('');
      } else {
        setCertifiedErrMessage('인증번호가 일치하지 않습니다.');
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
    if (isRequestCerificated && isPhoneValid) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [isRequestCerificated, isPhoneValid]);

  // 인풋값 관리
  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value.trim();
    setNickname(nickname);

    if (nickname === '') {
      setNicknameError('');
      setIsNicknameDuplicated(false);
      return;
    }
    if (nickname.length < 2 || nickname.length > 12) {
      setNicknameError('닉네임은 2자 이상, 12자 이하로 입력해주세요.');
      return;
    } else {
      setNicknameError('');
    }

    checkNicknameDuplication(e.target.value);
  };

  const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value.trim();
    setUserId(id);

    if (id === '') {
      setIdError('');
      setIsNicknameDuplicated(false);
      return;
    }
    if (id.length < 4 || id.length > 12) {
      setIdError('아이디는 4자 이상, 12자 이하로 입력해주세요.');
      return;
    } else {
      setIdError('');
    }

    checkIdDuplication(e.target.value);
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
    setStreet(e.target.value);
  };

  const handleDetailsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDetails(e.target.value);
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
    nickname,
    handleNicknameChange,
    handleCertificateCode,
    isSuccess,
    isPhoneError,
    phoneErrorMessage,
    isPasswordValid,
    certifiedErrMessage,
    isCertificationDisabled,
    nicknameError,
    idError,
    nicknameRef,
    userIdRef,
    passwordRef,
    passwordConfirmationRef,
    phoneNumberRef,
    addressRef,
    error,
    handlePrevStep,
    phoneNumber,
  };
}
