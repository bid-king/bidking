/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import colors from '../../design/colors';
import { Spacing } from '../../components/common/Spacing';
import { Text } from '../../components/common/Text';

export function AuctionTitle({ theme, nickname, auctionRoomType, title }: Props) {
  return (
    <div css={{ padding: '1.5rem', borderRadius: '1.5rem', ...THEME_VARIANT[theme] }}>
      <div>
        <Text content={'판매자 '} />
        <Text content={nickname} type="bold" />
      </div>
      <Spacing rem="0.5" />
      <div css={{ display: 'flex', width: '100%', alignItems: 'center' }}>
        <div
          css={{
            backgroundColor: auctionRoomType === 'GENERAL' ? colors.progress : colors.warn,
            color: colors.white,
            padding: '0.2rem 1rem 0.2rem 1rem',
            borderRadius: '1.5rem',
          }}
        >
          <Text content={auctionRoomType} type="bold" />
        </div>
        <Spacing rem="0.5" dir="h" />
        <Text content={title} type="h2" />
      </div>
    </div>
  );
}

const THEME_VARIANT = {
  light: {
    backgroundColor: colors.backgroundLight2,
  },
  dark: {
    backgroundColor: colors.backgroundDark2,
    color: colors.white,
  },
};
interface Props {
  theme: 'light' | 'dark';
  nickname: string;
  auctionRoomType: string;
  title: string;
}
