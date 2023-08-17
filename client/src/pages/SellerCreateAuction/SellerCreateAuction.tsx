/** @jsxImportSource @emotion/react */
import React from 'react';
import { AuctionCreateBox } from './AuctionCreateBox';
import colors from '../../_libs/design/colors';
import { Spacing } from '../../_libs/components/common/Spacing';

export function SellerCreateAuction() {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '5rem',
        backgroundColor: colors.backgroundDark,
        minHeight: '100vh',
      }}
    >
      <Spacing rem="3" />
      <AuctionCreateBox />
    </div>
  );
}
