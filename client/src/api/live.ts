import { Socket } from 'socket.io-client';
import { https } from '../_libs/util/http';
export function enter(auctionId: number, token: string) {
  return https.get<AuctionEnterResponse>(`/api/v1/bid/${auctionId}/enter`, token);
}
export function getItems(auctionId: number, token: string) {
  return https.get<AuctionEnterResponse>(`/api/v1/bid/${auctionId}/items`, token);
}
export function descStart(auctionId: number, token: string) {
  return https.post(`/api/v1/bid/${auctionId}/start`, token);
}
export function bid(auctionId: number, itemId: number, price: number, token: string) {
  return https.post(`/api/v1/bid/${auctionId}/items/${itemId}/try`, token, { price });
}
export function auctionEnd(auctionId: number, token: string) {
  return https.post(`/api/v1/bid/${auctionId}/end`, token);
}
export function live(ws: Socket | null) {
  return {
    send: {
      connect: (roomId: number, nickname: string, seller: boolean) =>
        ws?.emit('enterRoom', { nickname, roomId, seller }),
      bidStart: (roomId: number) => ws?.emit('start', { roomId }),
      chat: (roomId: number, nickname: string, msg: string) => ws?.emit('chat', { nickname, roomId, msg }),
      leave: (roomId: number) => {
        ws?.emit('leaveRoom', { roomId });
        // ws?.disconnect();
      },
      notice: (roomId: number, msg: string) => ws?.emit('notice', { roomId, msg }),
    },
    receive: {
      init: () => {
        //초기화
        let initData = {};
        ws?.on('init', data => {
          initData = { ...data };
        });
        return initData;
      },
      chat: () => {
        //채팅 수신
        const chat = { nickname: '', msg: '' };
        ws?.on('chat', data => {
          chat.nickname = data.nickname;
          chat.msg = data.msg;
        });
        return chat;
      },
      notice: () => {
        //공지 수신
        let notice: string = '';
        ws?.on('notice', data => {
          notice = data;
        });
        return notice;
      },
      updateBid: () => {
        //입찰가 업데이트 결과 수신
        const bidInfo = { nickname: '', price: '' };
        ws?.on('updateBid', data => {
          bidInfo.nickname = data.user.nickname;
          bidInfo.price = data.price;
        });
        return bidInfo;
      },
      successBid: () => {
        //낙찰
        const bidInfo = { nickname: '', itemName: '', price: '' };
        ws?.on('updateBid', data => {
          bidInfo.nickname = data.user.nickname;
          bidInfo.itemName = data.item.itemName;
          bidInfo.price = data.price;
        });
        return bidInfo;
      },
      failBid: () => {
        //유찰
        let itemName = '';
        ws?.on('failBid', data => {
          itemName = data.itemName;
        });
        return itemName;
      },
      next: () => {
        //다음 아이템 진행하기를 판매자가 누른 경우
        let itemName = '';
        ws?.on('next', data => {
          itemName = data.itemName;
        });
        return itemName;
      },
      start: () => {
        //경매 개시를 판매자가 누른 경우
        let itemName = '';
        ws?.on('start', data => {
          itemName = data.itemName;
        });
        return itemName;
      },
    },
  };
}

export interface AuctionEnterResponse {
  nickname: string;
  sellerNickname: string;
  auctionRoomType: 'COMMON' | 'REVERSE';
  title: string;
  auctionRoomId: number;
  currentItemId: number;
  seller: boolean;
}

export interface LiveItem {
  imageUrl: string;
  itemId: number;
  name: string;
  status: 'before' | 'in' | 'fail' | 'complete' | 'dummy';
  desc: string;
  startPrice: number;
}
export type liveItemList = Array<LiveItem>;
