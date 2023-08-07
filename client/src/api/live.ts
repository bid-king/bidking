import { https } from '../_libs/util/http';
import { ws } from '../_libs/util/ws';

export default {
  enter: async (auctionId: number) => https.get<AuctionEnterResponse>(`/api/v1/auctions/${auctionId}/enter`),
  //경매방 입장
  req: {
    connect: async (roomId: number, nickname: string) => ws.emit('enterRoom', { nickname, roomId }),
    chat: async (roomId: number, nickname: string, msg: string) => ws.emit('chat', { nickname, roomId, msg }),
    leave: async (roomId: number, nickname: string) => {
      ws.emit('leaveRoom', { nickname, roomId });
      ws.disconnect();
    },
    notice: async (roomId: number, msg: string) => ws.emit('notice', { roomId, msg }),
  },
  res: {
    chat: async () => {
      //채팅 수신
      const chat = { nickname: '', msg: '' };
      ws.on('chat', data => {
        chat.nickname = data.nickname;
        chat.msg = data.msg;
      });
      return chat;
    },
    notice: async () => {
      //공지 수신
      let notice: string = '';
      ws.on('notice', data => {
        notice = data;
      });
      return notice;
    },
    updateBid: async () => {
      //입찰가 업데이트 결과 수신
      const bidInfo = { nickname: '', price: '' };
      ws.on('updateBid', data => {
        bidInfo.nickname = data.user.nickname;
        bidInfo.price = data.price;
      });
      return bidInfo;
    },
    successBid: async () => {
      //낙찰
      const bidInfo = { nickname: '', itemName: '', price: '' };
      ws.on('updateBid', data => {
        bidInfo.nickname = data.user.nickname;
        bidInfo.itemName = data.item.itemName;
        bidInfo.price = data.price;
      });
      return bidInfo;
    },
    failBid: async () => {
      //유찰
      let itemName = '';
      ws.on('failBid', data => {
        itemName = data.itemName;
      });
      return itemName;
    },
    next: async () => {
      //다음 아이템 진행하기를 판매자가 누른 경우
      let itemName = '';
      ws.on('next', data => {
        itemName = data.itemName;
      });
      return itemName;
    },
    start: async () => {
      //경매 개시를 판매자가 누른 경우
      let itemName = '';
      ws.on('start', data => {
        itemName = data.itemName;
      });
      return itemName;
    },
  },
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
