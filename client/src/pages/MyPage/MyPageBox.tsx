/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Input } from '../../_libs/components/common/Input';
import { Label } from '../../_libs/components/common/Label';
import { Text } from '../../_libs/components/common/Text';
import { ProfileImage } from '../../_libs/components/common/ProfileImage';
import { Spacing } from '../../_libs/components/common/Spacing';
import { ConfirmButton } from '../../_libs/components/common/ConfirmButton';
import colors from '../../_libs/design/colors';
import { useMyPageBox } from '../../_libs/hooks/useMyPageBox';
import { InputFile } from '../../_libs/components/common/InputFile';

export function MyPageBox() {
  const {
    userId,
    nickname,
    phoneNumber,
    isPhoneValid,
    isVerificationVisible,
    isButtonDisabled,
    isPhoneError,
    phoneErrorMessage,
    street,
    details,
    zipCode,
    oldPassword,
    newPassword,
    phoneNumberErrorMessage,
    handlePhoneChange,
    handleOldPasswordChange,
    handleNewPasswordChange,
    handleCertificateCode,
    handleStreetChange,
    handleDetailsChange,
    handleZipCodeChange,
    handleImageChange,
    requestVerification,
    requestCerificated,
    memberUpdate,
    imgSrc,
    previewImageURL,
    errMessage,
    certifiedErrMessage,
    isCertificationDisabled,
    isChangeNewPassword,
    changePassword,
  } = useMyPageBox();

  return (
    <div
      css={{
        width: '33vw',
        minWidth: '27rem',
        borderRadius: '1.5rem',
        padding: '0 1.5rem 0 1.5rem',
        backgroundColor: colors.backgroundLight2,
      }}
    >
      <Spacing rem="1.5" />
      <div css={{ display: 'flex', justifyContent: 'space-between' }}>
        <ProfileImage src={previewImageURL ? previewImageURL : imgSrc} rem={4} />
        <div>
          <InputFile label="프로필 이미지 변경" accept="image/*" color="white" onChange={handleImageChange} />
        </div>
      </div>
      <Spacing rem="1" />
      <div>
        <Text type="h1" content={nickname} />
      </div>
      <Spacing rem="1.5" />
      <div>
        <Text type="h3" content="아이디" />
        <Spacing rem="0.5" />
        <div>
          <Text type="bold" content={userId} />
        </div>
      </div>
      <Spacing rem="1" />
      <div className="phone-nubmer">
        <Label theme="light" value="핸드폰 번호" htmlFor="phone-nubmer-input" />
        <Spacing rem="0.5" />
        <div
          css={{
            display: 'flex',
          }}
        >
          <div
            css={{
              width: '280%',
            }}
          >
            <Input id="phone-nubmer-input" value={phoneNumber} onChange={handlePhoneChange} placeholder="" />
          </div>
          <Spacing rem="1" />
          <Spacing rem="3" dir="h" />
          {!isCertificationDisabled && isPhoneValid && (
            <ConfirmButton btnType="certification" onClick={requestVerification} label="인증번호 전송" />
          )}
          {isCertificationDisabled || (!isPhoneValid && <ConfirmButton btnType="disabled" label="인증번호 전송" />)}
        </div>
        {phoneNumberErrorMessage && (
          <div>
            <Text type="normal" content={phoneNumberErrorMessage} />
          </div>
        )}
        {isVerificationVisible && isPhoneValid && (
          <div>
            <Spacing rem="1" />
            <Label
              theme="light"
              value="문자로 전송된 본인인증 번호를 입력해 주세요"
              htmlFor="phone-verification-input"
            />
            <Spacing rem="0.5" />
            <div
              css={{
                display: 'flex',
              }}
            >
              <div
                css={{
                  width: '280%',
                }}
              >
                <Input id="phone-verification-input" onChange={handleCertificateCode} placeholder="" />
              </div>
              <Spacing rem="3" dir="h" />
              <ConfirmButton btnType="certification" onClick={requestCerificated} label="인증" />
            </div>
          </div>
        )}
        <Spacing rem="1" />

        {isPhoneError && (
          <>
            <Text type="bold" content={phoneErrorMessage} />
            <Spacing rem="1" />
          </>
        )}
        {certifiedErrMessage && (
          <>
            <Text type="bold" content={certifiedErrMessage} />
            <Spacing rem="1" />
          </>
        )}
      </div>

      <div className="address">
        <Label theme="light" value="주소" htmlFor="street-signup-input" />
        <Spacing rem="0.5" />
        <Input
          id="street-signup-input"
          value={street}
          onChange={handleStreetChange}
          placeholder="서울특별시 종로구 종로3가"
        />
      </div>
      <Spacing rem="2" />

      <div className="address-details">
        <Label theme="light" value="상세 주소" htmlFor="details-signup-input" />
        <Spacing rem="0.5" />
        <Input
          id="details-signup-input"
          value={details}
          onChange={handleDetailsChange}
          placeholder="123-45 홍길동빌딩 7층"
        />
      </div>
      <Spacing rem="2" />

      <div className="zip-code">
        <Label theme="light" value="우편번호" htmlFor="zip-code-signup-input" />
        <Spacing rem="0.5" />
        <Input id="zip-code-signup-input" value={zipCode} onChange={handleZipCodeChange} placeholder="12345" />
      </div>
      <Spacing rem="2" />

      <Label theme="light" value="기존 비밀번호" htmlFor="old-password-input" />
      <Spacing rem="0.5" />
      <div
        className="old-password"
        css={{
          display: 'flex',
        }}
      >
        <div
          css={{
            width: '280%',
          }}
        >
          <Input
            id="old-password-input"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            placeholder=""
            inputType="password"
          />
        </div>
        <Spacing rem="3" dir="h" />

        <ConfirmButton onClick={changePassword} btnType="confirm" label="비밀번호 수정" />
      </div>
      <Spacing rem="2" />

      {isChangeNewPassword && (
        <div>
          <div className="new-password">
            <Label theme="light" value="새 비밀번호" htmlFor="new-password-input" />
            <Spacing rem="0.5" />

            <Input
              id="new-password-input"
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder=""
              inputType="password"
            />
          </div>
          <Spacing rem="2" />
        </div>
      )}
      {errMessage && <Text type="bold" content={errMessage} />}

      {isButtonDisabled && <ConfirmButton btnType="disabled" label="완료" />}

      {!isButtonDisabled && <ConfirmButton label="완료" onClick={memberUpdate} />}
      <Spacing rem="1" />
    </div>
  );
}
