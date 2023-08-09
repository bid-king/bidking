import { http, https } from '../_libs/util/http';
import axios from 'axios';
import { ROOT } from '../_libs/util/http';

export default {
  get: (auctionId: number) => http.get<AuctionRoomResponse>(`/api/v1/auctions/${auctionId}`),
  //경매 상세 정보
  post: (data: AuctionCreateRequest) => https.post('/api/v1/auctions', data),
  //경매 등록
  put: (auctionId: number, data: AuctionUpdateRequest) => https.put(`/api/v1/auctions/${auctionId}`, data),
  //경매 수정
  delete: (auctionId: number) => https.delete(`/api/v1/auctions/${auctionId}`),
  //경매 삭제
  getCategoryList: () => http.get<CategoryListResponse>('/api/v1/items/categories'),
  getSellerAuctionListBeforeLive: () =>
    https.get<SellerAuctionRoomListResponse[]>('/api/v1/auctions/seller/before-live'),
  getSellerAuctionListAfterLive: () => https.get<SellerAuctionRoomListResponse[]>('/api/v1/auctions/seller/after-live'),
};

export interface AuctionRoomResponse {
  id: number;
  sellerId: number;
  name: string;
  auctionRoomLiveState: 'BEFORE_LIVE';
  auctionRoomUrl: string;
  auctionRoomTradeState: 'BEFORE_PROGRESS';
  auctionRoomType: 'COMMON';
  startedAt: string;
  imageURL: string;
  itemList: ItemList[];
}

export interface ItemList {
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

interface AuctionCreateRequest {
  auctionTitle: string;
  startedAt: string;
  auctionRoomType: string;
  itemPermissionChecked: boolean;
  deliveryRulesChecked: boolean;
  items: {
    name: string;
    itemCategory: string;
    description: string;
    startPrice: string;
    ordering: number;
  }[];
}

interface AuctionUpdateRequest {
  auctionTitle: string;
  startedAt: string;
  auctionRoomType: 'COMMON' | 'REVERSE';
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

export interface Category {
  id: number;
  name: string;
}

export interface CategoryListResponse {
  categoryList: Category[];
}

// 옥션룸리스트 타입
export interface AuctionRoomListRequest {
  categoryList: number[];
  keyword: string;
  page: number;
  perPage: number;
}

interface ItemCategory {
  id: number;
  name: string;
}

export interface ItemListDto {
  id: number;
  name: string;
  itemCategory: ItemCategory;
}

export interface AuctionRoomListResponse {
  id: number;
  name: string;
  imageUrl: string;
  startedAt: string;
  auctionRoomLiveState: string;
  itemListDto: ItemListDto[];
  bookmarked: boolean;
}

export interface SellerAuctionRoomListResponse {
  id: number;
  name: string;
  imageUrl: string;
  startedAt: string;
  auctionRoomLiveState: string;
  itemListDto: ItemListDto[];
}
