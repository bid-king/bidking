import { http } from '../_libs/util/http';
import { AxiosResponse } from 'axios';

const API_URL = 'http://70.12.247.172:5000';

export default {
  // get: (memberId: number) => http.get(`${API_URL}/api/v1/members/${memberId}`),
  // //회원정보조회
  // put: (memberId: number, data: MemberUpdateResponce) => http.put(`${API_URL}/api/v1/members/${memberId}`, data),
  // //회원정보수정
  // delete: (memberId: number) => http.delete(`${API_URL}/api/v1/members/${memberId}`), //회원탈퇴
  // //회원탈퇴
  // nicknameValidate: (data: MemberNicknameDuplicateResponce) =>
  //   http.post(`${API_URL}/api/v1/members/check/nickname`, data),

  // //닉네임 중복검사, 중복이면 true
  // login: (socialType: 'google' | 'kakao') => http.post(`${API_URL}/api/v1/oauth/${socialType}`),
  // logout: () => http.post('/api/v1/logout'),
  // //로그인 및 로그아웃, oAuth 관련

  login: (userId: string, password: string) =>
    http.post<LoginResponse>(`${API_URL}/api/v1/members/login`, { userId, password }),

  signup: (
    userId: string,
    password: string,
    name: string,
    nickname: string,
    phoneNumber: string,
    address: { street: string; details: string; zipCode: string }
  ) =>
    http.post<SignupResponse>(`${API_URL}/api/v1/members/signup`, {
      userId,
      password,
      name,
      nickname,
      phoneNumber,
      address,
    }),

  // res.data 에 접근하려 하면 AxiosResponse 타입 사용
  idValidate: (userData: { userId: string }) =>
    http.post<DuplicateResponce>(`${API_URL}/api/v1/members/check/userId`, userData),
  nicknameValidate: (nicknameData: { nickname: string }) =>
    http.post<DuplicateResponce>(`${API_URL}/api/v1/members/check/nickname`, nicknameData),
  phoneVerification: (phoneData: { phoneNumber: string }) =>
    http.post<PhoneVerificationResponce>(`${API_URL}/api/v1/members/check/phoneNumber`, phoneData),
};

interface LoginResponse {
  grantType: 'Bearer';
  accessToken: string;
}

interface SignupResponse {
  id: string;
}
interface DuplicateResponce {
  duplicated: boolean;
}

interface PhoneVerificationResponce {
  certifiedNumber: string;
}

interface MemberNicknameDuplicateResponce {
  duplicated: string;
}
interface MemberUpdateResponce {
  memberId: number;
  memberNickname: string;
  memberPhoneNumber: string;
  street: string;
  details: string;
  zipcode: string;
  image: File;
}
