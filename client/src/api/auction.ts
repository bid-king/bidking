import { http } from './_http';

export default {
  get: () => http.get('/api/v1/auctions'),
  //경매 상세 정보
  post: (data: AuctionCreateRequest) => http.post('/api/v1/auctions', data),
  //경매 등록
  put: (auctionId: number, data: AuctionUpdateRequest) => http.put(`/api/v1/auctions/${auctionId}`, data),
  //경매 수정
  delete: (auctionId: number) => http.delete(`/api/v1/auctions/${auctionId}`),
  //경매 삭제
};

interface AuctionCreateRequest {
  auctionTitle: string;
  startedAt: string;
  auctionRoomType: 'GENERAL' | 'REVERSE';
  image: File;
  itemPermissionChecked: boolean;
  deliveryRulesChecked: boolean;
  item: [
    {
      name: string;
      itemCategory: number;
      description: string;
      startPrice: number;
      imageName: File;
      ordering: number;
    }
  ];
}

interface AuctionUpdateRequest {
  auctionTitle: string;
  startedAt: string;
  auctionRoomType: 'GENERAL' | 'REVERSE';
  image: File;
  item: [
    {
      name: string;
      itemCategory: number;
      description: string;
      startPrice: number;
      imageName: File;
      ordering: number;
    }
  ];
}
