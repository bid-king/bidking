/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import colors from '../../design/colors';
import { Text } from '../common/Text';
import { auctionDateParse } from '../../util/auctionDateParse';

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  date?: string;
  items?: string[];
  auctionRoomTradeState?: 'ALL_COMPLETED' | 'IN_PROGRESS' | 'BEFORE_PROGRESS' | 'NONE';
  auctionRoomLiveState?: 'ON_LIVE' | 'BEFORE_LIVE' | 'OFF_LIVE';
  // link: '',
  img?: string;
}

export function AuctionList({
  title = '경매제목',
  date = '오늘 18:00',
  items = ['물품1', '물품2', '물품3', '물품4', '물품5', '물품6'],
  auctionRoomTradeState = 'NONE',
  auctionRoomLiveState = 'ON_LIVE',
  img = '/image/bid.jpg',
}: Props) {
  return (
    <div
      css={{
        width: '22%',
        height: '13.5%',
        minWidth: '20rem',
        minHeight: '13.5rem',
        borderRadius: '1.5rem',
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      <img
        src={img}
        css={{
          position: 'absolute',
          width: 'inherit',
          height: 'auto',
          borderRadius: '1.5rem',
          minWidth: '32rem',
          transition: 'filter 0.15s',
          '&:hover': {
            filter: 'blur(0.25rem)',
          },
        }}
        onError={e => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = '/image/bid.jpg';
        }}
        alt={title}
      />

      <div
        css={{
          bottom: '1.5rem',
          left: '1.5rem',
          position: 'absolute',
          color: 'white',
          filter: 'drop-shadow(0 0 0.5rem #000)',
        }}
      >
        <Text type="h2" content={title} />
        <Text type="h3" content={auctionDateParse(date)} />
        {items.map((item, index) => (
          <Text key={index} content={index < 3 ? item : ''} />
        ))}
      </div>
      <div
        css={{
          position: 'absolute',
          textAlign: 'center',
          width: '100%',
          borderRadius: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...TRADE_STATE[auctionRoomTradeState],
        }}
      >
        {auctionRoomTradeState === 'ALL_COMPLETED' && '모든 절차가 끝났어요.'}
        {auctionRoomTradeState === 'IN_PROGRESS' && '하나 이상의 물건이 배송중이에요.'}
        {auctionRoomTradeState === 'BEFORE_PROGRESS' && '낙찰자가 아직 결제하지 않았어요.'}
      </div>
    </div>
  );
}

const TRADE_STATE = {
  NONE: {},
  ALL_COMPLETED: {
    height: '100%',
    backgroundColor: colors.black,
    opacity: '0.66',
    color: `${colors.white}`,
  },
  IN_PROGRESS: {
    height: '3rem',
    backgroundColor: colors.progress,
    color: `${colors.white}`,
  },
  BEFORE_PROGRESS: {
    height: '3rem',
    backgroundColor: colors.confirm,
    color: `${colors.black}`,
  },
};
