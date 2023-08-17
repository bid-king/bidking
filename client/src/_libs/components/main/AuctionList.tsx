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
        width: '100%',
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '0.5rem 0 1rem 0',
        ...THEME_VARIANT[auctionRoomTradeState],
      }}
    >
      <img
        src={img}
        css={{
          width: '100%',
          height: '100%',
          objectFit: 'fill',
          borderRadius: '0.8rem',
        }}
        onError={e => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = '/image/auctionListCardNoneImage.png';
        }}
        alt={title}
      />
      <Spacing rem="0.5" />
      <div>
        {auctionRoomTradeState === 'ALL_COMPLETED' && <Text content={'모든 절차가 끝났어요'} />}
        {auctionRoomTradeState === 'IN_PROGRESS' && <Text content={'상품을 배송하지 않았어요'} />}
        {auctionRoomLiveState === 'ON_LIVE' ? (
          <div css={{ color: colors.warn }}>
            <Text type="bold" content={'LIVE'} />
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
    color: colors.white,
  },
  IN_PROGRESS: {
    color: colors.white,
  },
  NONE: {
    color: colors.black,
  },
  BEFORE_PROGRESS: {
    color: colors.black,
  },
};
