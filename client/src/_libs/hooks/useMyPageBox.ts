import axios from 'axios';
import { useState, useEffect, ChangeEvent } from 'react';
import member from '../../api/member';
import { useAppSelector } from '../../store/hooks';
import { ROOT } from '../util/http';
import { useNavigate } from 'react-router-dom';

export function useMyPageBox() {
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
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);
  const { isLogined, accessToken } = useAppSelector(state => state.user);
  const [imgSrc, setImgSrc] = useState('/image/profile.png');
  const navigate = useNavigate();
  const memberId = useAppSelector(state => state.user.id);

  // Handlers
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
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setPreviewImageURL(url);
    }
  };

  // Functions
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

  const memberUpdate = async () => {
    if (memberId && isLogined) {
      const data = {
        oldPassword: oldPassword,
        newPassword: newPassword,
        nickname: nickname,
        phoneNumber: phoneNumber,
        address: {
          street: street,
          details: details,
          zipCode: zipCode,
        },
      };
      const formData = new FormData();
      formData.append('request', new Blob([JSON.stringify(data)], { type: 'application/json' }));
      if (image) {
        formData.append('image', image);
      }
      axios
        .put(`${ROOT}/api/v1/members/${memberId}`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => navigate('/'))
        .catch(err => console.log(err));
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
  useEffect(() => {
    if (memberId && isLogined) {
      member
        .get(memberId, accessToken)
        .then(data => {
          setUserId(data.userId);
          setNickname(data.nickname);
          setPhoneNumber(data.phoneNumber);
          setStreet(data.address.street);
          setDetails(data.address.details);
          setZipCode(data.address.zipCode);
          if (data.imageUrl === '') {
            setImgSrc('/image/profile.png');
          } else {
            setImgSrc(data.imageUrl);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [memberId]);
  return {
    userId,
    setUserId,
    nickname,
    setNickname,
    phoneNumber,
    setPhoneNumber,
    certificateCode,
    setCertificateCode,
    isPhoneValid,
    setPhoneValid,
    isVerificationVisible,
    setVerificationVisible,
    isRequestCerificated,
    setRequestCerificated,
    isButtonDisabled,
    setButtonDisabled,
    certifiedNumber,
    setCertifiedNumber,
    isPhoneError,
    setIsPhoneError,
    phoneErrorMessage,
    setPhoneErrorMessage,
    street,
    setStreet,
    details,
    setDetails,
    zipCode,
    setZipCode,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    phoneNumberErrorMessage,
    setPhoneNumberErrorMessage,
    image,
    setImage,
    isLogined,
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
  };
}
