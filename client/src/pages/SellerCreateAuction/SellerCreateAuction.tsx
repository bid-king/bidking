/** @jsxImportSource @emotion/react */
import React from 'react';
import { AuctionCreateBox } from './AuctionCreateBox';
import colors from '../../_libs/design/colors';

export function SellerCreateAuction() {
  return (
    <div
      css={{
        backgroundColor: colors.backgroundDark,
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <AuctionCreateBox />
    </div>
  );
}
