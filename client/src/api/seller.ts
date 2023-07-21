import { http } from './_http';

export default {
  getScheduled: () => http.get('/api/v1/auctions/seller/before-live'),
  //진행 예정 경매 리스트 조회
  getFinished: () => http.get('/api/v1/auctions/seller/after-live'),
  //완료된 경매방 리스트 조회
  getStatus: () => http.get('/api/v1/members/dashboard/seller'),
  //대시보드
  getFinishedDetail: (auctionId: number) => http.get(`/api/v1/auctions/${auctionId}/seller/after-live`),
  //완료된 경매 상세조회
  postInvoice: (deliveryId: number, data: InvoiceRequest) =>
    http.post(`/api/v1/deliveries/${deliveryId}/invoices`, data),
  //송장번호 입력
};

interface InvoiceRequest {
  data: {
    deliveryId: number;
    invoice: {
      id: number;
      number: string;
      courier: string;
    };
  };
}
