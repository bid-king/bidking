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
      const data = {
        request:{
            oldPassword: "ssafy1234",
            newPassword: "ssafy5678", // 변경 안하면 ""
            nickname: "천사",
            phoneNumber: "01023792142",
            address: {
              street: "광교호수로 15",
                details: "주소 상세 설명",
                zipCode: "32423"
            }
        }
        image: null
      
      }

      member
        .put(memberId ,data)
        .then(res => {
          console.log(res)

        })
        .catch(err => {
          console.log(err);
        });
    }

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
        <Text type="bold" content="핸드폰 번호" />
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

          <ConfirmButton btnType="certification" onClick={requestVerification} label="인증" />
        </div>
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

      {isButtonDisabled && <ConfirmButton btnType="disabled" label="완료" />}

      {!isButtonDisabled && <ConfirmButton label="완료" onClick={memberUpdate} />}
    </div>
  );
}
