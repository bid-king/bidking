/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import colors from '../../design/colors';
import { Text } from '../common/Text';
import { auctionDateParse } from '../../util/auctionDateParse';
import { Spacing } from '../common/Spacing';

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  date?: string;
  items?: string[];
  auctionRoomTradeState?: 'ALL_COMPLETED' | 'IN_PROGRESS' | 'BEFORE_PROGRESS' | 'NONE';
  auctionRoomLiveState?: 'ON_LIVE' | 'BEFORE_LIVE';
  // link: '',
  img?: string;
}

export function AuctionList({
  title = '경매제목',
  date = '오늘 18:00',
  items = ['물품1', '물품2', '물품3', '물품4', '물품5', '물품6'],
  auctionRoomTradeState = 'NONE',
  auctionRoomLiveState = 'BEFORE_LIVE',
  img,
}: Props) {
  return (
    <div
      css={{
        width: '20rem',
        height: '15rem',
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '0.8rem',
        color: colors.white,
        marginBottom: '1rem',
      }}
    >
      <img
        src={img}
        css={{
          width: '100%',
          height: '100%',
          minHeight: '15rem',
          objectFit: 'cover',
          ...LIVE_VARIANT[auctionRoomLiveState],
          ...THEME_VARIANT[auctionRoomTradeState],
          '&:hover': {
            filter: 'brightness(66%)',
          },
        }}
        onError={e => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = '/image/auctionListCardNoneImage.png';
        }}
        alt={title}
      />
      <Spacing rem="0.5" />
      <div css={{ position: 'absolute', bottom: '1rem', left: '1rem', filter: 'drop-shadow(0 0 0.1rem black)' }}>
        {auctionRoomTradeState === 'ALL_COMPLETED' && (
          <div css={{ color: colors.ok }}>
            <Text content={'모든 절차가 끝났어요'} />
          </div>
        )}
        {auctionRoomTradeState === 'IN_PROGRESS' && (
          <div css={{ color: colors.confirm }}>
            <Text content={'상품을 배송하지 않았어요'} />
          </div>
        )}
        {auctionRoomLiveState === 'ON_LIVE' ? (
          <div css={{ color: colors.warn }}>
            <Text type="bold" content={'● LIVE'} />
          </div>
        ) : (
          <div>
            <Text content={auctionDateParse(date)} />
          </div>
        )}
        <Spacing rem="0.5" />
        <Text type="h2" content={title} />
        <Spacing rem="0.5" />
        <Text content={items.slice(0, 3).join(', ')} />
      </div>
    </div>
  );
}
const THEME_VARIANT = {
  ALL_COMPLETED: {
    filter: 'brightness(66%)',
  },
  IN_PROGRESS: { filter: 'brightness(66%)' },
  BEFORE_PROGRESS: {},
  NONE: {},
};
const LIVE_VARIANT = {
  ON_LIVE: {
    filter: 'brightness(66%)',
  },
  BEFORE_LIVE: {},
};
