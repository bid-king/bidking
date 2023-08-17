/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import colors from '../../../design/colors';
import { ConfirmButton } from '../../common/ConfirmButton';
import { Spacing } from '../../common/Spacing';
import { AuctionTitle } from './AuctionTitle';

export function AuctionHeader({ userType, theme, sellerNickname, auctionRoomType, title }: Props) {
  return (
    <div
      css={{
        padding: '1rem',
        borderRadius: '1.85rem',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...THEME_VARIANT[theme],
      }}
    >
      <AuctionTitle theme={theme} sellerNickname={sellerNickname} auctionRoomType={auctionRoomType} title={title} />
    </div>
  );
}

const THEME_VARIANT = {
  light: { backgroundColor: colors.backgroundLight2, filter: `drop-shadow(0 0 0.15rem ${colors.lightgrey})` },
  dark: {
    backgroundColor: colors.backgroundDark2,
    color: colors.white,
  },
};
interface Props {
  userType: 'order' | 'seller';
  theme: 'light' | 'dark';
  sellerNickname: string;
  auctionRoomType: 'COMMON' | 'REVERSE';
  title: string;
}
