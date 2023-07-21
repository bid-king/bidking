import { http } from './_http';

export default {
  get: (data: AuctionListRequest) => http.post('/api/v1/auctions', data),
  //메인 경매 리스트 조회
  getBookmarked: () => http.get('/api/v1/auctions/bookmarks'),
  //북마크 리스트 조회
  bookmark: (data: BookmarkStatusRequest) => http.post('/api/v1/bookmarks', data),
  //북마크, 북마크 취소
  getCategory: () => http.get('/api/v1/items/categories'),
  //카테고리 리스트 조회
};

interface AuctionListRequest {
  categoryList: Array<number>;
  keyword: string;
  isBookmarked: boolean;
  inProgress: boolean;
  page: number;
  perPage: number;
}

interface BookmarkStatusRequest {
  auctionId: number;
}
