import { http, https } from '../_libs/util/http';
import axios from 'axios';
import { ROOT } from '../_libs/util/http';

export default {
  get: (auctionId: number, token: string) => https.get<AuctionRoomResponse>(`/api/v1/auctions/${auctionId}`, token),
  //경매 상세 정보
  post: (data: AuctionCreateRequest, token: string) => https.post('/api/v1/auctions', token, data),
  //경매 등록
  put: (auctionId: number, data: AuctionUpdateRequest, token: string) =>
    https.put(`/api/v1/auctions/${auctionId}`, token, data),
  //경매 수정
  delete: (auctionId: number, token: string) => https.delete(`/api/v1/auctions/${auctionId}`, token),
  //경매 삭제
  getCategoryList: () => http.get<CategoryListResponse>('/api/v1/items/categories'),
  getSellerAuctionListBeforeLive: (token: string) =>
    https.get<SellerAuctionRoomListResponse[]>('/api/v1/auctions/seller/before-live', token),
  getSellerAuctionListAfterLive: (token: string) =>
    https.get<SellerAuctionRoomListResponse[]>('/api/v1/auctions/seller/after-live', token),
  getSeller: (auctionId: number) => http.get<SellerAuctionDetail>(`/api/v1/auctions/${auctionId}/seller/after-live`),
};

export interface AuctionRoomResponse {
  id: number;
  sellerId: number;
  name: string;
  auctionRoomLiveState: 'BEFORE_LIVE' | 'ON_LIVE' | 'OFF_LIVE';
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

// 판매자 경매 상세조회 SellerAuctionDetail
export interface SellerAuctionDetail {
  id: number;
  sellerId: number;
  name: string;
  startedAt: string;
  auctionRoomLiveState: string;
  auctionRoomType: string;
  sellerNickname: string;
  imageURL: string;
  itemList: Item[];
}

export interface Item {
  itemId: number;
  itemName: string;
  category: string;
  price: number;
  itemImageUrl: string;
  itemDescription: string;
  itemOrdering: number;
  successTime: string | null;
  successMemberId: number | null;
  successMemberNickname: string | null;
  deliveryAddress: string | null;
  deliveryMsg: string | null;
  orderState:
    | 'PAYMENT_WAITING'
    | 'DELIVERY_WAITING'
    | 'DELIVERING'
    | 'COMPLETED'
    | 'ORDER_CANCELED'
    | 'DELIVERY_CANCELED'
    | 'ORDER_FAILED';
}

// interface Invoice {
//   courier: string;
//   invoiceId: number;
//   invoiceNumber: string;
// }

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
