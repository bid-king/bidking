import { http } from './_http';

const API_URL = 'http://70.12.247.202:8080';

export default {
  get: (memberId: number) => http.get(`${API_URL}/api/v1/members/${memberId}`),
  //회원정보조회
  put: (memberId: number, data: MemberUpdateRequest) => http.put(`${API_URL}/api/v1/members/${memberId}`, data),
  //회원정보수정
  delete: (memberId: number) => http.delete(`${API_URL}/api/v1/members/${memberId}`), //회원탈퇴
  //회원탈퇴
  idValidate: (data: MemberIdDuplicateRequest) => http.post(`${API_URL}/api/v1/members/check/nickname`, data),
  nicknameValidate: (data: MemberNicknameDuplicateRequest) =>
    http.post(`${API_URL}/api/v1/members/check/nickname`, data),

  //닉네임 중복검사, 중복이면 true
  login: (socialType: 'google' | 'kakao') => http.post(`${API_URL}/api/v1/oauth/${socialType}`),
  logout: () => http.post('/api/v1/logout'),
  //로그인 및 로그아웃, oAuth 관련
};

interface MemberUpdateRequest {
  memberId: number;
  memberNickname: string;
  memberPhoneNumber: string;
  street: string;
  details: string;
  zipcode: string;
  image: File;
}

interface MemberNicknameDuplicateRequest {
  duplicated: string;
}

interface MemberIdDuplicateRequest {
  userId: string;
}
