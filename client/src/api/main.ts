import { http, https } from '../_libs/util/http';

export default {
  get: (data: AuctionRoomListRequest) => {
    const params = new URLSearchParams();
    params.append('categoryList', data.categoryList.join(','));
    params.append('keyword', data.keyword);
    params.append('page', data.page.toString());
    params.append('perPage', data.perPage.toString());
    return http.get<AuctionRoomListResponse[]>(`/api/v1/auctions?${params.toString()}`);
  },
  //메인 경매 리스트 조회
  getLogined: (data: AuctionRoomListRequest, token: string) => {
    const params = new URLSearchParams();
    params.append('categoryList', data.categoryList.join(','));
    params.append('keyword', data.keyword);
    params.append('page', data.page.toString());
    params.append('perPage', data.perPage.toString());
    return https.get<AuctionRoomListResponse[]>(`/api/v1/auctions/status?${params.toString()}`, token);
  },
  getBookmarked: (data: AuctionRoomListRequest, token: string) => {
    const params = new URLSearchParams();
    params.append('categoryList', data.categoryList.join(','));
    params.append('keyword', data.keyword);
    params.append('page', data.page.toString());
    params.append('perPage', data.perPage.toString());
    return https.get<AuctionRoomListResponse[]>(`/api/v1/auctions/bookmarks?${params.toString()}`, token);
  },
  //북마크 리스트 조회
  bookmark: (data: BookmarkStatusRequest, token: string) =>
    https.post<BookmarkStatusResponse>('/api/v1/bookmarks', token, data),
  //북마크, 북마크 취소
  getCategory: () => http.get('/api/v1/items/categories'),
  //카테고리 리스트 조회
};

export interface BookmarkStatusRequest {
  auctionRoomId: number;
}

export interface BookmarkStatusResponse {
  auctionRoomId: number;
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
  auctionRoomLiveState: 'ON_LIVE' | 'BEFORE_LIVE';
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
