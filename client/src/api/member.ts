import { http } from '../_libs/util/http';

export default {
  get: (memberId: number) => http.get(`/api/v1/members/${memberId}`),
  //회원정보조회
  put: (memberId: number, data: MemberUpdateRequest) => http.put(`/api/v1/members/${memberId}`, data),
  //회원정보수정
  delete: (memberId: number) => http.delete(`/api/v1/members/${memberId}`), //회원탈퇴
  //회원탈퇴
  isDuplicated: (data: MemberNicknameDuplicateRequest) => http.post('/api/v1/members/check/nickname', data),
  //닉네임 중복검사, 중복이면 true
  login: (socialType: 'google' | 'kakao') => http.post(`/api/v1/oauth/${socialType}`),
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
  memeberNickname: string;
}
