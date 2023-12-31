import { http, https } from '../_libs/util/http';
import { DashBoard } from '../_libs/components/common/DashBoard';

export default {
  get: (token: string) => https.get<OrderItemResponse[]>('/api/v1/orders', token),
  //낙찰 물품 조회
  getStatus: (memberId: number, token: string) =>
    https.get<DashBoardResponce>(`/api/v1/members/${memberId}/dashboard`, token),
  //대시보드
  postAddress: (data: DeilveryRequest) => http.post('/api/v1/deliveries', data),
  //배송정보 입력
  putAddress: (deliveryId: number, data: DeilveryRequest) => http.put(`/api/v1/deliveries/${deliveryId}`, data),
  //배송정보 수정
  postReceived: (deliveryId: number) => http.get(`/api/v1/deliveries/${deliveryId}/complete`),
  //수령확인
};

interface DeilveryRequest {
  orderId: number;
  receiverName: string;
  receiverPhoneNumber: string;
  street: string;
  details: string;
  zipcode: string;
  message: string;
}

export interface DashBoardResponce {
  paymentWaiting: number;
  deliveryWaiting: number;
  penalty: number;
}

interface Address {
  street: string;
  details: string;
  zipCode: string;
}

export interface OrderItemResponse {
  orderItemId: number;
  orderItemName: string;
  orderedAt: string;
  paymentDeadline: string;
  orderPrice: number;
  sellerNickName: string;
  itemImageURL: string;
  itemDescription: string;
  orderState:
    | 'PAYMENT_WAITING'
    | 'DELIVERY_WAITING'
    | 'DELIVERING'
    | 'COMPLETED'
    | 'ORDER_CANCELED'
    | 'DELIVERY_CANCELED'
    | 'ORDER_FAILED';
  address: Address;
}
