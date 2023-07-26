/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../design/colors';
import { Spacing } from '../common/Spacing';
import { Text } from '../common/Text';
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
    <div
      css={{
        ...THEME_VARIANT[theme],
        borderRadius: '2rem',
        padding: '0 2rem',
      }}
    >
      {/* <BidList /> */}
      <Spacing rem="2" />
      <TopBidder theme={theme} />
      <Spacing rem="0.5" />
      <BidPrice align="center" theme={theme} />
      <Spacing rem="1" />
      <Timer theme={theme} />
      <Spacing rem="2" />
      <BiddingForm theme={theme} askingPrice={'1211000'} />
      <Spacing rem="2" />
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
