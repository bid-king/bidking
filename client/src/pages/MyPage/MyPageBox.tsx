/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, useState, useEffect } from 'react';
import { Input } from '../../_libs/components/common/Input';
import { Label } from '../../_libs/components/common/Label';
import { Text } from '../../_libs/components/common/Text';
import { ProfileImage } from '../../_libs/components/common/ProfileImage';
import { Spacing } from '../../_libs/components/common/Spacing';
import member from '../../api/member';
import { ConfirmButton } from '../../_libs/components/common/ConfirmButton';
import colors from '../../_libs/design/colors';
import { useAppSelector } from '../../store/hooks';
import axios from 'axios';
import { getToken } from '../../_libs/util/http';

export function MyPageBox() {
  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [certificateCode, setCertificateCode] = useState('');
  const [isPhoneValid, setPhoneValid] = useState(false);
  const [isVerificationVisible, setVerificationVisible] = useState(false);
  const [isRequestCerificated, setRequestCerificated] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [certifiedNumber, setCertifiedNumber] = useState('');
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
  const [street, setStreet] = useState('');
  const [details, setDetails] = useState('');
  const [zipCode, setZipCode] = useState('');
  const isLogined = useAppSelector(state => state.user.isLogined);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);

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

  const requestCerificated = () => {
    if (certificateCode) {
      if (certificateCode === certifiedNumber) {
        setRequestCerificated(true);
      }
    }
  };

  useEffect(() => {
    const phoneRegex = /^\d{10,11}$/;
    setPhoneValid(phoneRegex.test(phoneNumber));
  }, [phoneNumber]);

  useEffect(() => {
    if (isPhoneValid && street !== '' && details !== '' && zipCode !== '') {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [isPhoneValid, street, details, zipCode]);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value.trim();
    setPhoneNumber(newPhoneNumber);

    if (newPhoneNumber.length < 10 || newPhoneNumber.length > 11) {
      setPhoneNumberErrorMessage('폰 번호는 10자 이상 11자 이하이어야 합니다.');
    } else {
      setPhoneNumberErrorMessage('');
    }
  };

  const handleOldPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value.trim());
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value.trim());
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files ? e.target.files[0] : null;
    setImage(selectedImage);
  };

  // const memberId = useAppSelector(state => state.user.memberId);
  const memberId = 1;

  useEffect(() => {
    if (memberId && isLogined) {
      member
        .get(memberId)
        .then(data => {
          setUserId(data.userId);
          setNickname(data.nickname);
          setPhoneNumber(data.phoneNumber);
          setStreet(data.address.street);
          setDetails(data.address.details);
          setZipCode(data.address.zipCode);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [memberId]);

  const memberUpdate = () => {
    if (memberId && isLogined) {
      const data = new FormData();
      data.append('oldPassword', oldPassword);
      data.append('newPassword', newPassword);
      data.append('nickname', nickname);
      data.append('phoneNumber', phoneNumber);
      data.append(
        'address',
        JSON.stringify({
          street,
          details,
          zipCode,
        })
      );

      if (image) {
        data.append('profileImage', image);
      }

      axios
        .put(`/api/members/${memberId}`, data, {
          headers: {
            Authorization: `Bearer ${getToken}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  };

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
