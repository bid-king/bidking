import { https } from '../_libs/util/http';

export default {
  get: (auctionId: number) => https.get<AuctionRoomResponse>(`/api/v1/auctions/${auctionId}`),
  //경매 상세 정보
  post: (data: AuctionCreateRequest) => https.post('/api/v1/auctions', data),
  //경매 등록
  put: (auctionId: number, data: AuctionUpdateRequest) => https.put(`/api/v1/auctions/${auctionId}`, data),
  //경매 수정
  delete: (auctionId: number) => https.delete(`/api/v1/auctions/${auctionId}`),
  //경매 삭제
};

export interface AuctionRoomResponse {
  id: number;
  sellerId: number;
  name: string;
  auctionRoomLiveState: 'BEFORE_LIVE';
  auctionRoomUrl: string;
  auctionRoomTradeState: 'BEFORE_PROGRESS';
  auctionRoomType: 'GENERAL';
  startedAt: string;
  imageURL: string;
  itemList: [
    {
      itemId: number;
      itemName: string;
      category: string;
      startPrice: number;
      itemState: 'PRE_AUCTION';
      itemImageUrl: string;
      itemDescription: string;
      itemOrdering: number;
      successTime: string;
      successPrice: number;
      successMemberNickname: string;
      successMemberId: number;
      deliveryAddress: string;
      deliveryMsg: string;
      invoice: {
        courier: string;
        invoiceId: number;
        invoiceNumber: string;
      };
    }
  ];
}

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
