/** @jsxImportSource @emotion/react */
import React from 'react';
import { AuctionUpdateBox } from './AuctionUpdateBox';
import colors from '../../_libs/design/colors';

export function SellerUpdateAuction() {
  return (
    <div
      css={{
        backgroundColor: colors.backgroundDark,
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <AuctionUpdateBox />
    </div>
  );
}
