/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import colors from '../../design/colors';
import { ConfirmButton } from '../common/ConfirmButton';
import { Spacing } from '../common/Spacing';
import { Text } from '../common/Text';
import { AuctionItemStatus } from './AuctionItemStatus';
import { AuctionTitle } from './AuctionTitle';

export function AuctionHeader({ userType, theme, nickname, auctionRoomType, title }: Props) {
  return (
    <div
      css={{
        padding: '1rem',
        borderRadius: '1.85rem',
        display: 'flex',
        flexDirection: 'column',
        ...THEME_VARIANT[theme],
      }}
    >
      <AuctionTitle theme={theme} nickname={nickname} auctionRoomType={auctionRoomType} title={title} />
      {userType === 'seller' && (
        <div>
          <Spacing rem="2" />
          <ConfirmButton btnType="warn" label="경매 종료" type="button" onClick={() => {}} />
        </div>
      )}
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
  nickname: string;
  auctionRoomType: string;
  title: string;
}
