/** @jsxImportSource @emotion/react */
import React, { MutableRefObject, useEffect, useState } from 'react';
import colors from '../../design/colors';
import { Spacing } from '../common/Spacing';
import { AuctionItemStatus, DUMMY } from './auctionItemList/AuctionItemStatus';
import { BiddingForm } from './bidForm/BiddingForm';
import { BidPrice } from './bidPrice/BidPrice';
import { Timer } from './bidTimer/Timer';
import { Bidder } from './bidder/Bidder';
import { Socket } from 'socket.io-client';
import { ChatRoom } from './chatRoom/ChatRoom';
import { live, LiveItem, liveItemList } from '../../../api/live';
import { askingPriceParse } from '../../util/bidPriceParse';
import { arrayPadding } from '../../util/arrayPadding';
import { BidCtrl } from './bidForm/BidCtrl';

export function AuctionSystem({ userType, theme = 'light', nickname, auctionRoomId, socket }: Props) {
  const [order, setOrder] = useState<number>(2); //순서, 2부터 시작함
  const [currPrice, setCurrPrice] = useState<number>(0); //현재 최고 입찰가 (입찰성공시 업데이트)
  const [topbidder, setTopBidder] = useState<string>('기맨'); //현재 최고 입찰자
  const [currId, setCurrId] = useState<number>(0); //현재 진행중인 아이템
  const [itemList, setItemList] = useState<liveItemList | undefined>(undefined); //전체 아이템리스트
  const [disable, setDisable] = useState<boolean>(true); //입찰 대기 시간동안 버튼이 눌리지 않는 상태
  const [hide, setHide] = useState<boolean>(false); //판매자에게 어떤 버튼이 보이는지, 보이지 않는지
  const [currTime, setCurrTime] = useState<number>(10); //남은 시간
  const [liveStatus, setLiveStatus] = useState<string>('');
  useEffect(() => {
    const SOCKET_API = live(socket.current);
    socket.current?.on('init', ({ currentItemId, itemList }) => {
      const adjusted = arrayPadding(itemList, DUMMY, 2);
      setItemList(adjusted);
      setCurrId(currentItemId);
    }); //API 요청 성공시, 이 데이터가 소켓에서옴
    socket.current?.on('start', ({ itemId, price }) => {
      setDisable(false);
      setLiveStatus('inAuction');
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
      setItemList(result); //유찰
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
      setItemList(result); //유찰
      setOrder(order + 1);
      setLiveStatus('pending');
    }); //유찰
    socket.current?.on('time', second => {
      setCurrTime(second);
    }); //시간 업데이트
  }, [socket.current]);

  return (
    <div>
      <div
        css={{
          width: '100%',
          borderRadius: '1.85rem',
          padding: '1rem',
          ...THEME_VARIANT[theme],
        }}
      >
        <AuctionItemStatus order={order} theme={theme} itemList={itemList} currentItemId={currId} />
        <Spacing rem="1" />
        <Bidder theme={theme} bidder={topbidder} />
        <Spacing rem="1" />
        <BidPrice align="center" theme={theme} price={currPrice} />
        <Spacing rem="1.5" />
        <Timer theme={theme} time={currTime} />
        <Spacing rem="1.5" />
        {userType === 'order' ? (
          <BiddingForm theme={theme} askingPrice={askingPriceParse(currPrice)} onBid={() => {}} disable={disable} />
        ) : (
          <BidCtrl liveStatus={liveStatus} />
        )}
      </div>
      <Spacing rem="0.5" />
      <ChatRoom roomId={auctionRoomId} nickname={nickname} theme={theme} userType="order" socket={socket} />
    </div>
  );
}

const THEME_VARIANT = {
  light: {
    color: colors.black,
    backgroundColor: colors.backgroundLight2,
  },
  dark: {
    color: colors.white,
    backgroundColor: colors.backgroundDark2,
  },
};

interface Props {
  userType: 'order' | 'seller';
  theme: 'dark' | 'light';
  nickname: string;
  auctionRoomId: number;
  socket: MutableRefObject<Socket | null>;
  setNotice?: () => void;
}
