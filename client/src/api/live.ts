import { Socket } from 'socket.io-client';
import { https } from '../_libs/util/http';
export function enter(auctionId: number, token: string) {
  return https.get<AuctionEnterResponse>(`/api/v1/auctions/${auctionId}/enter`, token);
}
export function getItems(auctionId: number, token: string) {
  return https.get<AuctionEnterResponse>(`/api/v1/auctions/${auctionId}/items`, token);
}
export function liveStart(auctionId: number) {}
export function itemStart(auctionId: number, itemId: number, token: string) {
  return https.post(`/api/v1/bid/${auctionId}/items/${itemId}/start`, token);
}
export function bid(auctionId: number, itemId: number, price: string, token: string) {
  return https.post(`/api/v1/bid/${auctionId}/items/${itemId}/start`, token, { price });
}
export function auctionEnd(auctionId: number, token: string) {
  return https.post(`/api/v1/bid/${auctionId}/end`, token);
}
export function live(ws: Socket | null) {
  return {
    send: {
      connect: (roomId: number, nickname: string, isSeller: boolean) =>
        ws?.emit('enterRoom', { nickname, roomId, isSeller }),
      chat: (roomId: number, nickname: string, msg: string) => ws?.emit('chat', { nickname, roomId, msg }),
      leave: (roomId: number, nickname: string) => {
        ws?.emit('leaveRoom', { nickname, roomId });
        ws?.disconnect();
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
  auctionRoomType: 'COMMON' | 'REVERSE';
  title: string;
  auctionRoomId: number;
  currentItemId: number;
  seller: boolean;
}

export interface SocketAPI {
  req: {
    connect: (roomId: number, nickname: string) => Socket;
    chat: (roomId: number, nickname: string, msg: string) => void;
    leave: (roomId: number, nickname: string) => void;
    notice: (roomId: number, msg: string) => void;
  };
  res: {
    chat: () => { nickname: string; msg: string };
    notice: () => string;
    updateBid: () => { nickname: string; price: string };
    successBid: () => { nickname: string; itemName: string; price: string };
    failBid: () => string;
    next: () => string;
    start: () => string;
  };
}
export interface LiveItem {
  itemImg: string;
  itemId: number;
  name: string;
  status: 'before' | 'in' | 'fail' | 'complete' | 'dummy';
  desc: string;
  startPrice: number;
}
export type liveItemList = Array<LiveItem>;
