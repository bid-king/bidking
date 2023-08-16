import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { LiveItem, liveItemList } from '../../api/live';
import { arrayPadding } from '../util/arrayPadding';
import { DUMMY } from '../components/auctionSystem/auctionItemList/AuctionItemStatus';
import { bidPriceParse } from '../util/bidPriceParse';
import { Navigate, useNavigate } from 'react-router-dom';

export function useAuctionSystem(socket: MutableRefObject<Socket | null>, userType: 'order' | 'seller') {
  const [order, setOrder] = useState<number>(2); //순서, 2부터 시작함
  const [currPrice, setCurrPrice] = useState<number>(0); //현재 최고 입찰가 (입찰성공시 업데이트)
  const [askingPrice, setAskingPrice] = useState<number>(0); //호가
  const [priceArr, setPriceArr] = useState<string[]>(['']);
  const [topbidder, setTopBidder] = useState<string>('-'); //현재 최고 입찰자
  const [currId, setCurrId] = useState<number>(0); //현재 진행중인 아이템
  const [itemList, setItemList] = useState<liveItemList | undefined>(undefined); //전체 아이템리스트
  const [disable, setDisable] = useState<boolean>(true); //입찰 대기 시간동안 버튼이 눌리지 않는 상태
  const [currTime, setCurrTime] = useState<number>(0); //남은 시간
  const [liveStatus, setLiveStatus] = useState<'inAuction' | 'inDesc' | 'beforeDesc' | 'end'>('beforeDesc');
  const orderRef = useRef<number>(order);
  const itemListRef = useRef<liveItemList | undefined>(itemList);

  const navigate = useNavigate();
  useEffect(() => {
    orderRef.current = order;
    itemListRef.current = itemList;
  }, [order, itemList]);

  useEffect(() => {
    socket.current?.on('init', ({ currentItemId, itemList }: Init) => {
      const adjusted = arrayPadding(itemList, DUMMY, 2);
      setItemList(adjusted);
      setCurrId(currentItemId);
    }); //API 요청 성공시, 이 데이터가 소켓에서옴

    socket.current?.on('next', ({ itemId, price, askingPrice }: NextItem) => {
      setItemList(currentList => {
        const result = currentList?.map<LiveItem>(item => {
          if (item.itemId === itemId) item.status = 'in';
          return item;
        });
        return result;
      });
      setCurrId(itemId);
      setCurrPrice(price);
      setAskingPrice(askingPrice);
      setPriceArr([bidPriceParse(String(price))]);
      setDisable(true);
    }); //다음 아이템 설명시작

    socket.current?.on('start', ({ itemId, price, askingPrice }: NextItem) => {
      setDisable(false);
      setLiveStatus('inAuction');
      setCurrId(itemId);
      setCurrPrice(price);
      setAskingPrice(askingPrice);
      setPriceArr(bidPriceParse('0').split(''));
    }); //아이템 경매 시작 (전체 경매가 시작되는것)

    socket.current?.on('updateBid', ({ itemId, userId, nickname, price, time, askingPrice }: Result) => {
      setCurrPrice(price);
      setPriceArr(bidPriceParse(String(price)).split(''));
      setTopBidder(nickname);
      setAskingPrice(askingPrice);
      setDisable(true);
      setTimeout(() => setDisable(false), 500); //잠깐대기
    }); //입찰

    socket.current?.on('successBid', ({ itemId, userId, nickname, price, time, askingPrice }: Result) => {
      setDisable(true);
      setItemList(currentList => {
        const result = currentList?.map<LiveItem>(item => {
          if (item.itemId === itemId) item.status = 'complete';
          return item;
        });
        return result;
      });
      setCurrId(itemListRef.current ? itemListRef.current[orderRef.current + 1].itemId : 0);
      setOrder(orderRef.current && orderRef.current + 1);
      setLiveStatus(
        orderRef.current === (itemListRef.current?.length && itemListRef.current.length - 4) ? 'end' : 'beforeDesc'
      ); //지금 순서가 마지막 순서였으면 끝내고, 아니면 계속 진행
      setTopBidder('-');
    }); //낙찰

    socket.current?.on('failBid', ({ itemId }: { itemId: number }) => {
      setDisable(true);
      setItemList(currentList => {
        const result = currentList?.map<LiveItem>(item => {
          if (item.itemId === itemId) item.status = 'fail';
          return item;
        });
        return result;
      });
      setCurrId(itemListRef.current ? itemListRef.current[orderRef.current + 1].itemId : 0);
      setOrder(orderRef.current && orderRef.current + 1);
      setLiveStatus(
        orderRef.current === (itemListRef.current?.length && itemListRef.current.length - 4) ? 'end' : 'beforeDesc'
      ); //지금 순서가 마지막 순서였으면 끝내고, 아니면 계속 진행
      setTopBidder('-');
    }); //유찰

    socket.current?.on('time', (time: number) => {
      setCurrTime(time);
    }); //시간 업데이트

    socket.current?.on('roomClosed', roomId => {
      socket.current?.emit('roomClosed', roomId);
      userType === 'seller' ? navigate('/seller') : navigate('/');
    });
  }, [socket.current]);

  return {
    order,
    currPrice,
    askingPrice,
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
  askingPrice: number;
}
interface Result {
  itemId: number;
  userId: number;
  nickname: string;
  price: number;
  askingPrice: number;
  time: string;
}
