/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { Text } from './Text';
import colors from '../../design/colors';
import { Spacing } from './Spacing';
import { Input } from './Input';
import { ConfirmButton } from './ConfirmButton';
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
    handleUserIdBlur,
    nickname,
    handleNicknameChange,
    handleNicknameBlur,
    handleUserNameChange,
    handleCertificateCode,
    isSuccess,
    isNicknameDuplicated,
  } = useSignUp();

  return (
    <>
      {!isSuccess && (
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
                <div className="userName">
                  <label htmlFor="userName-signup-input">
                    <Text type="bold" content="이름을 입력해주세요" />
                  </label>
                  <Spacing rem="1" />
                  <Input
                    id="userName-signup-input"
                    onChange={handleUserNameChange}
                    placeholder=""
                    inputType="userName"
                  />
                </div>
                <Spacing rem="2" />

                <ConfirmButton onClick={handleNextStep} label="다음" />
              </>
            )}
            {step === 'nickname' && (
              <>
                <div className="nickname">
                  <label htmlFor="nickname-signup-input">
                    <Text type="bold" content="닉네임을 입력해주세요" />
                  </label>
                  <Spacing rem="1" />
                  <Input
                    id="nickname-signup-input"
                    onChange={handleNicknameChange}
                    onBlur={handleNicknameBlur}
                    placeholder=""
                    inputType="nickname"
                  />
                </div>
                <Spacing rem="2" />

                {isNicknameDuplicated && (
                  <>
                    <Text type="bold" content="닉네임이 중복되었습니다." />
                    <Spacing rem="1" />
                  </>
                )}

                {nickname === '' && <ConfirmButton btnType="disabled" label="다음" />}
                {nickname !== '' && <ConfirmButton onClick={handleNextStep} label="다음" />}
              </>
            )}
            {step === 'id' && (
              <>
                <div className="userId">
                  <label htmlFor="userId-signup-input">
                    <Text type="bold" content="아이디를 입력해주세요" />
                  </label>
                  <Spacing rem="1" />
                  <Input
                    id="userId-signup-input"
                    onChange={handleUserIdChange}
                    onBlur={handleUserIdBlur}
                    placeholder=""
                    inputType="userId"
                  />
                </div>
                <Spacing rem="2" />

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
                <div className="password">
                  <label htmlFor="password-signup-input">
                    <Text type="bold" content="비밀번호를 입력해주세요" />
                  </label>
                  <Spacing rem="1" />
                  <Input
                    id="password-signup-input"
                    onChange={handlePasswordChange}
                    placeholder=""
                    inputType="password"
                  />
                </div>
                <Spacing rem="2" />
                <ConfirmButton onClick={handleNextStep} label="다음" />
              </>
            )}

            {step === 'password-again' && (
              <>
                <div className="password-again">
                  <label htmlFor="password-again-signup-input">
                    <Text type="bold" content="비밀번호를 다시 한 번 입력해주세요" />
                  </label>
                  <Spacing rem="1" />
                  <Input
                    id="password-again-signup-input"
                    onChange={handlePasswordConfirmationChange}
                    placeholder=""
                    inputType="password"
                  />
                </div>
                <Spacing rem="2" />

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
                  {isVerificationVisible && isPhoneValid && (
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
                          <Input id="phone-verification-input" onChange={handleCertificateCode} placeholder="" />
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
                <div className="address">
                  <label htmlFor="street-signup-input">
                    <Text type="bold" content="주소를 입력해주세요" />
                  </label>
                  <Spacing rem="1" />
                  <Input id="street-signup-input" onChange={handleStreetChange} placeholder="" />
                </div>
                <Spacing rem="2" />

                <div className="address-details">
                  <label htmlFor="details-signup-input">
                    <Text type="bold" content="상세 주소를 입력해주세요" />
                  </label>
                  <Spacing rem="1" />
                  <Input id="details-signup-input" onChange={handleDetailsChange} placeholder="" />
                </div>
                <Spacing rem="2" />

                <div className="zip-code">
                  <label htmlFor="zip-code-signup-input">
                    <Text type="bold" content="우편번호를 입력해주세요" />
                  </label>
                  <Spacing rem="1" />
                  <Input id="zip-code-signup-input" onChange={handleZipCodeChange} placeholder="" />
                </div>
                <Spacing rem="2" />

                {(street === '' || details === '' || zipCode === '') && (
                  <>
                    <ConfirmButton btnType="disabled" label="완료" />
                  </>
                )}
                {street !== '' && details !== '' && zipCode !== '' && (
                  <>
                    <ConfirmButton type="submit" onClick={handleNextStep} btnType="ok" label="완료" />
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
      )}
      {isSuccess && (
        <div
          css={{
            width: '50rem',
            borderRadius: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Link to={'/login'}>
            <Text type="h2" content="이제 로그인해서 입찰왕의 모든 서비스를 이용하실 수 있어요." />
          </Link>
        </div>
      )}
    </>
  );
}
