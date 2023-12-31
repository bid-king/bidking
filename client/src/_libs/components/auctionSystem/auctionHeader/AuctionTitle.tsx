/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import colors from '../../../design/colors';
import { Spacing } from '../../common/Spacing';
import { Text } from '../../common/Text';
export function AuctionTitle({ theme, sellerNickname, title, auctionRoomType }: Props) {
  return (
    <div>
      <div css={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div css={{ display: 'flex' }}>
          <div
            css={{
              padding: '0.2rem 1rem 0.2rem 1rem',
              borderRadius: '1.5rem',
              backgroundColor: auctionRoomType === 'COMMON' ? colors.progress : colors.warn,
              color: colors.white,
            }}
          >
            <Text content={AUCTION_TYPE[auctionRoomType]} type="bold" />
          </div>
          <Spacing rem="0.25" dir="h" />
          <div
            css={{
              padding: '0.2rem 1rem 0.2rem 1rem',
              borderRadius: '1.5rem',
              ...THEME_VARIANT[theme],
            }}
          >
            <Text content={'판매자 '} />
            <Text content={sellerNickname} type="bold" />
          </div>
        </div>
        <Spacing rem="0.5" />
        <div css={{ padding: '0.25rem 0.5rem 0 0.5rem' }}>
          <Text content={title ? title : '경매방 제목'} type="h2" />
        </div>
      </div>
    </div>
  );
}
const THEME_VARIANT = {
  light: { color: colors.black, backgroundColor: 'transparent', border: `1px solid ${colors.black}` },
  dark: { color: colors.white, backgroundColor: 'transparent', border: `1px solid ${colors.white}` },
};

const AUCTION_TYPE = {
  COMMON: '일반 경매',
  REVERSE: '네덜란드',
};
interface Props {
  theme: 'light' | 'dark';
  sellerNickname: string;
  auctionRoomType: 'COMMON' | 'REVERSE';
  title: string;
}
