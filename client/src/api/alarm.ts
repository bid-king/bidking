import { http, https } from '../_libs/util/http';
import axios from 'axios';
import { ROOT } from '../_libs/util/http';

export default {
  get: (token: string) => https.get<AlarmResponse[]>('/api/v1/alarms/records', token),
  // 알림 정보
  post: (memberId: number, data: ReadRequest, token: string) => https.post(`/api/v1/alarms/${memberId}`, token, data),
  // 알림 읽음 요청
};

export interface AlarmResponse {
  id: number;
  content: string;
  createdTime: string;
  alarmType: 'AUCTION' | 'ORDER' | 'DELIVERY';
  isRead: boolean;
}

export interface ReadRequest {
  alarmId: number;
}
