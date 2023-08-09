import { https } from '../_libs/util/http';
import { wss } from '../_libs/util/wss';

export default {
  enter: async (auctionId: number, token: string) =>
    https.get<AuctionEnterResponse>(`/api/v1/auctions/${auctionId}/enter`, token),
  //경매방 입장
  next: () => {},
  //판매자 다음 아이템 경매개시
  bid: () => {},
  //구매자 입찰
  //라이브 소켓 커넥션 요청
  chat: () => {},
  //구매자 채팅
  notice: () => {},
  //판매자 공지
  end: () => {},
  //판매자 나가기
};

export interface AuctionEnterResponse {
  nickname: string;
  auctionRoomType: string;
  title: string;
  auctionRoomId: number;
  currentItemId: number;
  itemList: Array<{
    itemId: number;
    imageUrl: string;
    name: string;
    description: string;
    startPrice: number;
  }>;
}
