/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';
import colors from '../design/colors';
import bid from '../static/bid.jpg';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
  title?: string;
  date?: string;
  items?: string[];
  auctionRoomTradeState?:
    | 'ALL_COMPLETED'
    | 'IN_PROGRESS'
    | 'BEFORE_PROGRESS'
    | 'NONE';
  auctionRoomLiveState?: 'ON_LIVE' | 'BEFORE_LIVE' | 'OFF_LIVE';
  // link: '',
  img?: string;
}

export function AuctionList({
  theme = 'light',
  title = '경매제목',
  date = '오늘 18:00',
  items = ['물품1', '물품2', '물품3', '물품4', '물품5', '물품6'],
  auctionRoomTradeState = 'NONE',
  auctionRoomLiveState = 'ON_LIVE', // 라이브 현재 상태 설정 필요
  img = bid,
}: Props) {
  return (
    <div
      css={{
        width: '25.75rem',
        height: '16.625rem',
        borderRadius: '0.5rem',
        position: 'relative',
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'filter 0.3s',
        '&:hover': {
          backgroundImage: `url(${bid})`,
          filter: 'brightness(0.7)',
        },
        ...TYPE_VARAIANTS[theme],
      }}
    >
      <div
        css={{
          textAlign: 'center',
          width: '100%',
          height: '3.5rem',
          borderRadius: '0.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...TRADE_STATE[auctionRoomTradeState],
          fontWeight: 'bold',
        }}
      >
        {auctionRoomTradeState === 'ALL_COMPLETED' && '완료'}
        {auctionRoomTradeState === 'IN_PROGRESS' && '결제/배송중'}
        {auctionRoomTradeState === 'BEFORE_PROGRESS' && '결제대기'}
      </div>
      <div
        css={{
          bottom: '0',
          position: 'absolute',
          margin: '1rem',
        }}
      >
        <p css={{ fontWeight: 'bold' }}>{title}</p>
        <p>{date}</p>
        {items.map((item, index) => (
          <span key={index}>{index < 3 ? <>{item}, </> : null}</span>
        ))}
      </div>
    </div>
  );
}

const TYPE_VARAIANTS = {
  light: {
    backgroundColor: colors.backgroundLight2,
  },
  dark: {
    backgroundColor: colors.backgroundDark2,
    color: colors.white,
  },
};

const TRADE_STATE = {
  NONE: {},
  ALL_COMPLETED: {
    backgroundColor: colors.ok,
    color: `${colors.black}`,
  },
  IN_PROGRESS: {
    backgroundColor: colors.progress,
    color: `${colors.white}`,
  },
  BEFORE_PROGRESS: {
    backgroundColor: colors.confirm,
    color: `${colors.black}`,
  },
};
