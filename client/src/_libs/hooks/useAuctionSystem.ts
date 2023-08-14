import React, { MutableRefObject, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { LiveItem, liveItemList } from '../../api/live';
import { arrayPadding } from '../util/arrayPadding';
import { DUMMY } from '../components/auctionSystem/auctionItemList/AuctionItemStatus';

export function useAuctionSystem(socket: MutableRefObject<Socket | null>) {
  const [order, setOrder] = useState<number>(2); //순서, 2부터 시작함
  const [currPrice, setCurrPrice] = useState<number>(0); //현재 최고 입찰가 (입찰성공시 업데이트)
  const [topbidder, setTopBidder] = useState<string>('-'); //현재 최고 입찰자
  const [currId, setCurrId] = useState<number>(0); //현재 진행중인 아이템
  const [itemList, setItemList] = useState<liveItemList | undefined>(undefined); //전체 아이템리스트
  const [disable, setDisable] = useState<boolean>(true); //입찰 대기 시간동안 버튼이 눌리지 않는 상태
  const [currTime, setCurrTime] = useState<number>(10); //남은 시간
  const [liveStatus, setLiveStatus] = useState<'beforeStart' | 'inAuction' | 'pending' | 'end'>('beforeStart');

  useEffect(() => {
    socket.current?.on('init', ({ currentItemId, itemList }) => {
      const adjusted = arrayPadding(itemList, DUMMY, 2);
      setItemList(adjusted);
      setCurrId(currentItemId);
    }); //API 요청 성공시, 이 데이터가 소켓에서옴

    socket.current?.on('start', ({ itemId, price }) => {
      setDisable(false);
      setLiveStatus('inAuction');
      setCurrId(itemId);
      setCurrPrice(price);
    }); //아이템 경매 시작 (전체 경매가 시작되는것)

    socket.current?.on('next', ({ itemId, price }) => {
      const result = itemList?.map<LiveItem>(item => {
        if (item.itemId === itemId) {
          return {
            ...item,
            status: 'in',
          };
        }
        return item;
      });
      setItemList(result);
      setCurrPrice(price);
      setDisable(true);
    }); //다음 아이템 설명시작

    socket.current?.on('updateBid', ({ itemId, userId, nickname, price, time }) => {
      console.log('업뎃업뎃');
      console.log(itemId, userId, nickname, price, time);
      setCurrPrice(price);
      setCurrTime(time);
      setTopBidder(nickname);
      setDisable(true);
      setTimeout(() => setDisable(false), 250); //잠깐대기
    }); //입찰

    socket.current?.on('successBid', ({ itemId, userId, nickname, price, time }) => {
      setDisable(true); //버튼 다시 누를 수 없도록 처리함 (다음 아이템설명)
      const result = itemList?.map<LiveItem>(item => {
        if (item.itemId === itemId) {
          return {
            ...item,
            status: 'complete',
          };
        }
        return item;
      });
      setItemList(result);
      setOrder(order + 1);
      setLiveStatus('pending');
    }); //낙찰

    socket.current?.on('failBid', ({ itemId }) => {
      setDisable(true); //버튼 다시 누를수 없도록 처리함 (다음 아이템설명)
      const result = itemList?.map<LiveItem>(item => {
        if (item.itemId === itemId) {
          return {
            ...item,
            status: 'fail',
          };
        }
        return item;
      });
      setItemList(result);
      setOrder(order + 1);
      setLiveStatus('pending');
    }); //유찰

    socket.current?.on('time', time => {
      setCurrTime(time);
    }); //시간 업데이트
  }, [socket.current]);

  return { order, currPrice, topbidder, currId, itemList, disable, currTime, liveStatus, setCurrId, setLiveStatus };
}
