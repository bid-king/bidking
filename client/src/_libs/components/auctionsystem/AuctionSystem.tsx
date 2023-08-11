/** @jsxImportSource @emotion/react */
import React, { MutableRefObject, useEffect, useState } from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../design/colors';
import { Spacing } from '../common/Spacing';
import { Text } from '../common/Text';
import { AuctionItemStatus } from './AuctionItemStatus';
import { BiddingForm } from './bidForm/BiddingForm';
import { BidPrice } from './bidPrice/BidPrice';
import { Timer } from './bidTimer/Timer';
import { Bidder } from './bidder/Bidder';
import { Socket } from 'socket.io-client';
import { ChatRoom } from './chatRoom/ChatRoom';
import { ItemList } from '../../../api/live';

export function AuctionSystem({ theme = 'light', nickname, auctionRoomId, socket }: Props) {
  const [price, setPrice] = useState<number>(0);
  const [cur, setCur] = useState<number>(0);
  const [itemList, setItemList] = useState<ItemList | undefined>(undefined);
  const [disable, setDisable] = useState<boolean>(false);
  useEffect(() => {
    socket.current?.on('init', data => {}); //API 요청 성공시, 옴
    socket.current?.on('successBid', data => {}); //낙찰
    socket.current?.on('failBid', data => {}); //유찰
    socket.current?.on('time', data => {}); //시간 업데이트
  }, [socket.current]);
  return (
    <div>
      <div
        css={{
          ...THEME_VARIANT[theme],
          width: '100%',
          borderRadius: '1.85rem',
          padding: '1rem',
        }}
      >
        <AuctionItemStatus theme={theme} itemList={itemList} currentItemId={cur} />
        <Spacing rem="1" />
        <Bidder theme={theme} />
        <Spacing rem="0.5" />
        <BidPrice align="center" theme={theme} price={price} />
        <Spacing rem="1" />
        <Timer theme={theme} socket={socket} />
        <Spacing rem="1.5" />
        <BiddingForm theme={theme} askingPrice={String(Math.floor((Number(price) * 1.1) / 10) * 10)} onBid={() => {}} />
      </div>
      <Spacing rem="0.5" />
      <div>
        <ChatRoom roomId={auctionRoomId} nickname={nickname} theme="light" userType="order" socket={socket} />
      </div>
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
  theme: 'dark' | 'light';
  nickname: string;
  auctionRoomId: number;
  socket: MutableRefObject<Socket | null>;
}
