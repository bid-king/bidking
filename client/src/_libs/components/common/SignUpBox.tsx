/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { Text } from './Text';
import colors from '../../design/colors';
import { Spacing } from './Spacing';
import { Input } from './Input';
import { ConfirmButton } from './ConfirmButton';
import { SignUpInput } from './SignUpInput';
import { Link } from 'react-router-dom';
import { useSignUp } from '../hooks/useSignUp';

// interface Props extends HTMLAttributes<HTMLDivElement> {}

export function SignUpBox() {
  const {
    step,
    handleNextStep,
    handleUserIdChange,
    handlePasswordChange,
    handlePasswordConfirmationChange,
    handlePhoneChange,
    handleAddressChange,
    password,
    passwordConfirmation,
    address,
    isVerificationVisible,
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
  } = useSignUp();

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
        {step === 'userName' && (
          <>
            <SignUpInput
              onChange={handleUserNameChange}
              className="userName"
              inputTitle="이름을 입력해주세요"
              inputId="userName-signup-input"
              inputType="userName"
            />
            <ConfirmButton onClick={handleNextStep} label="다음" />
          </>
        )}
        {step === 'nickname' && (
          <>
            <SignUpInput
              onChange={handleNicknameChange}
              onBlur={handleNicknameBlur}
              className="nickname"
              inputTitle="닉네임을 입력해주세요"
              inputId="nickname-signup-input"
              inputType="nickname"
            />
            {isIdDuplicated && (
              <>
                <Text type="bold" content="아이디가 중복되었습니다." />
                <Spacing rem="1" />
              </>
            )}

            {nickname === '' && <ConfirmButton btnType="disabled" label="다음" />}
            {nickname !== '' && <ConfirmButton onClick={handleNextStep} label="다음" />}
          </>
        )}
        {step === 'id' && (
          <>
            <SignUpInput
              onChange={handleUserIdChange}
              onBlur={handleUserIdBlur}
              className="userId"
              inputTitle="아이디를 입력해주세요"
              inputId="userId-signup-input"
              inputType="userId"
            />
            {isIdDuplicated && (
              <>
                <Text type="bold" content="아이디가 중복되었습니다." />
                <Spacing rem="1" />
              </>
            )}

            {userId === '' && <ConfirmButton btnType="disabled" label="다음" />}
            {userId !== '' && <ConfirmButton onClick={handleNextStep} label="다음" />}
          </>
        )}

        {step === 'password' && (
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

        {step === 'password-again' && (
          <>
            <SignUpInput
              onChange={handlePasswordConfirmationChange}
              className="password-again"
              inputTitle="비밀번호를 다시 한 번 입력해주세요"
              inputId="password-again-signup-input"
              inputType="password"
            />
            {password !== passwordConfirmation && <ConfirmButton btnType="disabled" label="다음" />}
            {password === passwordConfirmation && <ConfirmButton onClick={handleNextStep} label="다음" />}
          </>
        )}

        {step === 'phone-number' && (
          <>
            <div className="phone-nubmer">
              <Text type="bold" content="본인인증을 진행할게요" />
              <Spacing rem="1" />
              <div
                css={{
                  display: 'flex',
                }}
              >
                <div
                  css={{
                    width: '80rem',
                  }}
                >
                  <Input id="phone-nubmer-signup-input" onChange={handlePhoneChange} placeholder="" />
                </div>
                <Spacing rem="3" dir="h" />
                <Spacing rem="2" />

                <ConfirmButton btnType="certification" onClick={requestVerification} label="인증번호 전송" />
              </div>
              {isVerificationVisible && (
                <>
                  <Spacing rem="1" />
                  <div
                    css={{
                      display: 'flex',
                    }}
                  >
                    <div
                      css={{
                        width: '120rem',
                      }}
                    >
                      <Input id="phone-nubmer-signup-input" onChange={handlePhoneChange} placeholder="" />
                    </div>
                    <Spacing rem="3" dir="h" />
                    <ConfirmButton btnType="certification" onClick={requestCerificated} label="인증" />
                  </div>
                </>
              )}
            </div>
            <Spacing rem="2" />
            {isButtonDisabled && <ConfirmButton btnType="disabled" label="다음" />}

            {!isButtonDisabled && <ConfirmButton onClick={handleNextStep} label="다음" />}
          </>
        )}

        {step === 'address' && (
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
