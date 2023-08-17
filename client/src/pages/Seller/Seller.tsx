/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../../_libs/design/colors';
import { SellerBox } from './SellerBox';

export function Seller() {
  return (
    <div
      css={{
        backgroundColor: colors.backgroundDark,
        color: colors.white,
        minHeight: '100vh',
      }}
    >
      <SellerBox />
    </div>
  );
}
