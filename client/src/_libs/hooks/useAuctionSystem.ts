import React, { MutableRefObject, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { LiveItem, liveItemList } from '../../api/live';
import { arrayPadding } from '../util/arrayPadding';
import { DUMMY } from '../components/auctionSystem/auctionItemList/AuctionItemStatus';
import { bidPriceParse } from '../util/bidPriceParse';

export function useAuctionSystem(socket: MutableRefObject<Socket | null>) {
  const [order, setOrder] = useState<number>(2); //순서, 2부터 시작함
  const [currPrice, setCurrPrice] = useState<number>(0); //현재 최고 입찰가 (입찰성공시 업데이트)
  const [priceArr, setPriceArr] = useState<string[]>(['']);
  const [topbidder, setTopBidder] = useState<string>('-'); //현재 최고 입찰자
  const [currId, setCurrId] = useState<number>(0); //현재 진행중인 아이템
  const [itemList, setItemList] = useState<liveItemList | undefined>(undefined); //전체 아이템리스트
  const [disable, setDisable] = useState<boolean>(true); //입찰 대기 시간동안 버튼이 눌리지 않는 상태
  const [currTime, setCurrTime] = useState<number>(0); //남은 시간
  const [liveStatus, setLiveStatus] = useState<'beforeStart' | 'inAuction' | 'inDesc' | 'beforeDesc' | 'end'>(
    'beforeStart'
  );

  useEffect(() => {
    socket.current?.on('init', ({ currentItemId, itemList }: Init) => {
      const adjusted = arrayPadding(itemList, DUMMY, 2);
      setItemList(adjusted);
      setCurrId(currentItemId);
    }); //API 요청 성공시, 이 데이터가 소켓에서옴

    socket.current?.on('start', ({ itemId, price }: NextItem) => {
      setDisable(false);
      setLiveStatus('inAuction');
      setCurrId(itemId);
      setCurrPrice(price);
      setPriceArr([bidPriceParse(String(price))]);
    }); //아이템 경매 시작 (전체 경매가 시작되는것)

    socket.current?.on('next', ({ itemId, price }: NextItem) => {
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
      setPriceArr([bidPriceParse(String(price))]);
      setDisable(true);
    }); //다음 아이템 설명시작

    socket.current?.on('updateBid', ({ itemId, userId, nickname, price, time }: Result) => {
      setCurrPrice(price);
      setPriceArr(bidPriceParse(String(price)).split(''));
      setTopBidder(nickname);
      setDisable(true);
      setTimeout(() => setDisable(false), 500); //잠깐대기
    }); //입찰

    socket.current?.on('successBid', ({ itemId, userId, nickname, price, time }: Result) => {
      setDisable(true); //버튼 다시 누를 수 없도록 처리함 (다음 아이템설명)
      const result = itemList?.map<LiveItem>(item => {
        if (item.itemId === itemId) item.status = 'complete';
        return item;
      });
      console.log(result);
      setItemList(result);
      setOrder(order + 1);
      setCurrId(itemId), setLiveStatus('beforeDesc');
    }); //낙찰

    socket.current?.on('failBid', ({ itemId }: { itemId: number }) => {
      setDisable(true); //버튼 다시 누를수 없도록 처리함 (다음 아이템설명)
      const result = itemList?.map<LiveItem>(item => {
        if (item.itemId === itemId) item.status = 'fail';
        return item;
      });
      console.log(result);
      setItemList(result);
      setCurrId(itemId), setOrder(order + 1);
      setLiveStatus('beforeDesc');
    }); //유찰

    socket.current?.on('time', (time: number) => {
      setCurrTime(time);
    }); //시간 업데이트
  }, [socket.current]);

  return {
    order,
    currPrice,
    priceArr,
    topbidder,
    currId,
    itemList,
    disable,
    currTime,
    liveStatus,
    setCurrId,
    setLiveStatus,
  };
}

interface Init {
  currentItemId: number;
  itemList: liveItemList;
}

interface NextItem {
  itemId: number;
  price: number;
}
interface Result {
  itemId: number;
  userId: number;
  nickname: string;
  price: number;
  time: string;
}
