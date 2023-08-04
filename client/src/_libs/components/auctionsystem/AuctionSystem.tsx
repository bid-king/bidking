/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../design/colors';
import { Spacing } from '../common/Spacing';
import { Text } from '../common/Text';
import { AuctionItemStatus } from './AuctionItemStatus';
import { BiddingForm } from './BiddingForm';
import { BidPrice } from './BidPrice/BidPrice';
import { Timer } from './Timer';
import { TopBidder } from './TopBidder';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme: 'dark' | 'light';
}
export function AuctionSystem({ theme = 'light' }: Props) {
  useEffect(() => {}, []);
  return (
    <>
      <div
        css={{
          ...THEME_VARIANT[theme],
          width: '100%',
          borderRadius: '2rem',
          padding: '0 1.5rem 0 1.5rem',
        }}
      >
        <Spacing rem="1.5" />
        <AuctionItemStatus theme={theme} currentItemId={3} />
        <Spacing rem="1.5" />
      </div>
      <Spacing rem="1.5" />
      <div
        css={{
          ...THEME_VARIANT[theme],
          width: '100%',
          borderRadius: '2rem',
          padding: '0 1.5rem',
        }}
      >
        <Spacing rem="1.5" />
        <TopBidder theme={theme} />
        <Spacing rem="0.5" />
        <BidPrice align="center" theme={theme} />
        <Spacing rem="1.5" />
        <Timer theme={theme} />
        <Spacing rem="1" />
        <BiddingForm theme={theme} askingPrice={'11410000'} />
        <Spacing rem="1.5" />
      </div>
    </>
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
