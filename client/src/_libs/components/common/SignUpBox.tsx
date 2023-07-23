/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { HTMLAttributes } from 'react';
import { Text } from './Text';
import colors from '../../design/colors';
import { Spacing } from './Spacing';
import { Input } from './Input';
import { ConfirmButton } from './ConfirmButton';
import { SignUpInput } from './SignUpInput';
import { Link } from 'react-router-dom';

// interface Props extends HTMLAttributes<HTMLDivElement> {}

export function SignUpBox() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const [isEmailValid, setEmailValid] = useState(false);
  const [isPhoneValid, setPhoneValid] = useState(false);

  // 이메일 유효성 체크
  useEffect(() => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    setEmailValid(emailRegex.test(email));
  }, [email]);

  // 핸드폰번호 유효성 체크(변경 가능)
  useEffect(() => {
    const phoneRegex = /^\d{10,11}$/;
    setPhoneValid(phoneRegex.test(phoneNumber));
  }, [phoneNumber]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.target.value);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    if (step === 0 && isEmailValid) {
      setStep(prevStep => prevStep + 1);
    } else if (step === 1) {
      setStep(prevStep => prevStep + 1);
    } else if (step === 2) {
      setStep(prevStep => prevStep + 1);
    } else if (step === 3 && isPhoneValid) {
      setStep(prevStep => prevStep + 1);
    } else if (step === 4 && address !== '') {
      // 서버로 AJAX 요청
      console.log({
        email,
        password,
        phoneNumber,
        address,
      });
    }
  };

  return (
    <form
      onSubmit={handleNextStep}
      css={{
        width: '50rem',
        borderRadius: '0.5rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.backgroundLight,
      }}
    >
      <Text type="h2" content="간단하게 가입해요." />
      <Spacing rem="2" />

      <div
        css={{
          padding: '0.5rem',
        }}
      >
        {step === 0 && (
          <>
            <SignUpInput
              onChange={handleEmailChange}
              className="email"
              inputTitle="이메일을 입력해주세요"
              inputId="email-signup-input"
              inputType="email"
            />
            {!isEmailValid && (
              <>
                <ConfirmButton btnType="disabled" label="다음" />
              </>
            )}
            {isEmailValid && (
              <>
                <ConfirmButton onClick={handleNextStep} label="다음" />
              </>
            )}
          </>
        )}

        {step === 1 && (
          <>
            <SignUpInput
              onChange={handlePasswordChange}
              className="password"
              inputTitle="비밀번호를 입력해주세요"
              inputId="password-signup-input"
              inputType="password"
            />
            <ConfirmButton onClick={handleNextStep} label="다음" />
          </>
        )}

        {step === 2 && (
          <>
            <SignUpInput
              onChange={handlePasswordConfirmationChange}
              className="password-again"
              inputTitle="비밀번호를 다시 한 번 입력해주세요"
              inputId="password-again-signup-input"
              inputType="password"
            />
            {password !== passwordConfirmation && (
              <>
                <ConfirmButton btnType="disabled" label="다음" />
              </>
            )}
            {password === passwordConfirmation && (
              <>
                <ConfirmButton onClick={handleNextStep} label="다음" />
              </>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <div className="phone-nubmer">
              <label htmlFor="phone-nubmer-signup-input">
                <Text type="bold" content="본인인증을 진행할게요" />
              </label>
              <Spacing rem="1" />
              <Input id="phone-nubmer-signup-input" onChange={handlePhoneChange} placeholder="" />
            </div>
            <Spacing rem="2" />
            {!isPhoneValid && (
              <>
                <Text type="bold" content="유효한 전화번호를 입력해주세요." />
                <Spacing rem="2" />
              </>
            )}
            <ConfirmButton onClick={handleNextStep} label="다음" />
          </>
        )}

        {step === 4 && (
          <>
            <SignUpInput
              onChange={handleAddressChange}
              className="address"
              inputTitle="물품을 받을 배송지를 입력해주세요"
              inputId="address-signup-input"
            />
            {address === '' && (
              <>
                <ConfirmButton btnType="disabled" label="완료" />
              </>
            )}
            {address !== '' && (
              <>
                <ConfirmButton type="submit" btnType="ok" label="완료" />
              </>
            )}
          </>
        )}

        <Spacing rem="2" />
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text type="p" content="아이디/비밀번호 찾기" />
          <Link to={'/login'}>
            <Text type="bold" content="이미 가입했어요" />
          </Link>
        </div>
      </div>
    </form>
  );
}
