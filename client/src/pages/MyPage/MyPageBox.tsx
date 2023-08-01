/** @jsxImportSource @emotion/react */
import React from 'react';
import { Input } from '../../_libs/components/common/Input';
import { Label } from '../../_libs/components/common/Label';
import { Text } from '../../_libs/components/common/Text';
import { ProfileImage } from '../../_libs/components/common/ProfileImage';
import { Spacing } from '../../_libs/components/common/Spacing';
import { ConfirmButton } from '../../_libs/components/common/ConfirmButton';
import colors from '../../_libs/design/colors';
import { useMyPageBox } from '../../_libs/hooks/useMyPageBox';

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
  } = useMyPageBox();

  return (
    <div
      css={{
        width: '50rem',
        borderRadius: '0.5rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.backgroundLight2,
      }}
    >
      <div>
        <ProfileImage rem={4} />
        <input type="file" onChange={handleImageChange} />
      </div>
      <div>
        <Text type="h1" content={nickname} />
      </div>
      <Spacing rem="1" />
      <div>
        <Text type="h3" content="아이디" />
        <div>
          <Text type="bold" content={userId} />
        </div>
      </div>
      <Spacing rem="1" />
      <div className="phone-nubmer">
        <Label theme="light" value="핸드폰 번호" htmlFor="phone-nubmer-input" />
        <Spacing rem="1" />
        <div
          css={{
            display: 'flex',
          }}
        >
          <div
            css={{
              width: '180rem',
            }}
          >
            <Input id="phone-nubmer-input" value={phoneNumber} onChange={handlePhoneChange} placeholder="" />
          </div>
          <Spacing rem="3" dir="h" />
          <Spacing rem="2" />

          <ConfirmButton btnType="certification" onClick={requestVerification} label="인증번호전송" />
        </div>
        {phoneNumberErrorMessage && (
          <div>
            <Text type="normal" content={phoneNumberErrorMessage} />
          </div>
        )}
        {isVerificationVisible && isPhoneValid && (
          <div>
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
          </div>
        )}
      </div>
      <Spacing rem="2" />
      {isPhoneError && (
        <div>
          <Text type="bold" content={phoneErrorMessage} />
          <Spacing rem="1" />
        </div>
      )}

      <div className="address">
        <Label theme="light" value="주소" htmlFor="street-signup-input" />
        <Spacing rem="1" />
        <Input id="street-signup-input" value={street} onChange={handleStreetChange} placeholder="" />
      </div>
      <Spacing rem="2" />

      <div className="address-details">
        <Label theme="light" value="상세 주소" htmlFor="details-signup-input" />
        <Spacing rem="1" />
        <Input id="details-signup-input" value={details} onChange={handleDetailsChange} placeholder="" />
      </div>
      <Spacing rem="2" />

      <div className="zip-code">
        <Label theme="light" value="우편번호" htmlFor="zip-code-signup-input" />
        <Spacing rem="1" />
        <Input id="zip-code-signup-input" value={zipCode} onChange={handleZipCodeChange} placeholder="" />
      </div>
      <Spacing rem="2" />

      <div className="old-password">
        <Label theme="light" value="기존 비밀번호" htmlFor="old-password-input" />
        <Spacing rem="1" />
        <Input
          id="old-password-input"
          value={oldPassword}
          onChange={handleOldPasswordChange}
          placeholder=""
          inputType="password"
        />
      </div>
      <Spacing rem="2" />

      <div className="new-password">
        <Label theme="light" value="새 비밀번호" htmlFor="new-password-input" />
        <Spacing rem="1" />
        <Input
          id="new-password-input"
          value={newPassword}
          onChange={handleNewPasswordChange}
          placeholder=""
          inputType="password"
        />
      </div>
      <Spacing rem="2" />

      {isButtonDisabled && <ConfirmButton btnType="disabled" label="완료" />}

      {!isButtonDisabled && <ConfirmButton label="완료" onClick={memberUpdate} />}
    </div>
  );
}
