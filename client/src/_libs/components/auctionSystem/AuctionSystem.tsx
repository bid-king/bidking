/** @jsxImportSource @emotion/react */
import React, { MutableRefObject, useEffect, useState } from 'react';
import colors from '../../design/colors';
import { Spacing } from '../common/Spacing';
import { AuctionItemStatus, DUMMY } from './auctionItemList/AuctionItemStatus';
import { BidPrice } from './bidPrice/BidPrice';
import { Timer } from './bidTimer/Timer';
import { Bidder } from './bidder/Bidder';
import { BiddingForm } from './bidCtrl/BiddingForm';
import { Socket } from 'socket.io-client';
import { ChatRoom } from './chatRoom/ChatRoom';
import { askingPriceParse } from '../../util/bidPriceParse';
import { useAuctionSystem } from '../../hooks/useAuctionSystem';
import { BidCtrl } from './bidCtrl/BidCtrl';

export function AuctionSystem({ userType, theme = 'light', nickname, auctionRoomId, socket }: Props) {
  const {
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
  } = useAuctionSystem(socket);
  if (auctionRoomId)
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
          <BidPrice align="center" theme={theme} priceArr={priceArr} />
          <Spacing rem="1.5" />
          <Timer theme={theme} time={currTime} />
          <Spacing rem="1.5" />
          {userType === 'order' ? (
            <BiddingForm
              auctionRoomId={auctionRoomId}
              itemId={currId}
              theme={theme}
              currPrice={currPrice}
              askingPrice={askingPrice}
              disable={disable}
            />
          ) : (
            <BidCtrl
              socket={socket}
              liveStatus={liveStatus}
              setLiveStatus={setLiveStatus}
              setCurrId={setCurrId}
              auctionRoomId={auctionRoomId}
              itemId={currId}
            />
          )}
        </div>
        <Spacing rem="0.5" />
        <ChatRoom roomId={auctionRoomId} nickname={nickname} theme={theme} userType="order" socket={socket} />
      </div>
    );
  else return <></>;
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
  auctionRoomId: number | null;
  socket: MutableRefObject<Socket | null>;
  setNotice?: () => Promise<unknown>;
}
