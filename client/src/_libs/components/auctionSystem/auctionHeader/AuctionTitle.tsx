/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import auctionType from '../../../constants/auctionType';
import colors from '../../../design/colors';
import { Spacing } from '../../common/Spacing';
import { Text } from '../../common/Text';
export function AuctionTitle({ theme, nickname, title, auctionRoomType }: Props) {
  return (
    <div>
      <div css={{ padding: '0 0.5rem 0 0.5rem' }}>
        <Text content={title} type="h3" />
      </div>
      <Spacing rem="0.5" />
      <div css={{ display: 'flex', alignItems: 'center' }}>
        <div
          css={{
            padding: '0.2rem 1rem 0.2rem 1rem',
            borderRadius: '1.5rem',
            backgroundColor: auctionRoomType === 'COMMON' ? colors.progress : colors.warn,
            color: colors.white,
          }}
        >
          <Text content={auctionType[auctionRoomType]} type="bold" />
        </div>
        <Spacing rem="0.5" dir="h" />
        <div
          css={{
            padding: '0.2rem 1rem 0.2rem 1rem',
            borderRadius: '1.5rem',
            ...THEME_VARIANT[theme],
          }}
        >
          <Text content={'판매자 '} />
          <Text content={nickname} type="bold" />
        </div>
      </div>
    </div>
  );
}
const THEME_VARIANT = {
  light: { color: colors.black, backgroundColor: 'transparent', border: `1px solid ${colors.black}` },
  dark: { color: colors.white, backgroundColor: 'transparent', border: `1px solid ${colors.white}` },
};

interface Props {
  theme: 'light' | 'dark';
  nickname: string;
  auctionRoomType: 'COMMON' | 'REVERSE';
  title: string;
}
