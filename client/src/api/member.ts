import { http, https } from '../_libs/util/http';

export default {
  get: (memberId: number, token: string) => https.get<MemberUpdateResponse>(`/api/v1/members/${memberId}`, token),
  //회원정보조회
  put: (memberId: number, data: MemberUpdateRequest, token: string) =>
    https.put(`/api/v1/members/${memberId}`, token, data),
  //회원정보수정
  // delete: (memberId: number) => http.delete(`${API_URL}/api/v1/members/${memberId}`), //회원탈퇴
  // //회원탈퇴
  // nicknameValidate: (data: MemberNicknameDuplicateResponse) =>
  //   http.post(`${API_URL}/api/v1/members/check/nickname`, data),

  logout: (token: string) => https.post('/api/v1/members/logout', token),
  // //로그인 및 로그아웃, oAuth 관련

  login: (userId: string, password: string) => http.post<LoginResponse>('/api/v1/members/login', { userId, password }),

  signup: (
    userId: string,
    password: string,
    nickname: string,
    phoneNumber: string,
    address: { street: string; details: string; zipCode: string }
  ) =>
    http.post<SignupResponse>('/api/v1/members/signup', {
      userId,
      password,
      nickname,
      phoneNumber,
      address,
    }),

  // res.data 에 접근하려 하면 AxiosResponse 타입 사용
  idValidate: (userData: { userId: string }) => http.post<DuplicateResponse>('/api/v1/members/check/userId', userData),
  nicknameValidate: (nicknameData: { nickname: string }) =>
    http.post<DuplicateResponse>('/api/v1/members/check/nickname', nicknameData),
  phoneVerification: (phoneData: { phoneNumber: string }) =>
    http.post<PhoneVerificationResponse>('/api/v1/members/check/phoneNumber', phoneData),
};

interface LoginResponse {
  id: number;
  grantType: 'Bearer';
  accessToken: string;
  nickname: string;
  refreshToken: string;
}

interface SignupResponse {
  id: string;
}
interface DuplicateResponse {
  duplicated: boolean;
}

interface PhoneVerificationResponse {
  certifiedNumber: string;
}

interface Address {
  street: string;
  details: string;
  zipCode: string;
}

export interface MemberUpdateRequest {
  oldPassword: string;
  newPassword: string;
  nickname: string;
  phoneNumber: string;
  address: Address;
}

export interface MemberUpdateResponse {
  userId: string;
  nickname: string;
  phoneNumber: string;
  address: Address;
  imageUrl: string;
  penalty: number;
}
