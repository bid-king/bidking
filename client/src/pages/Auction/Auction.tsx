/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { ChatRoom } from '../../_libs/components/auction/ChatRoom';
import { AuctionSystem } from '../../_libs/components/auctionsystem/AuctionSystem';
import { Spacing } from '../../_libs/components/common/Spacing';
import { Text } from '../../_libs/components/common/Text';
import { BuyerStream } from '../../_libs/components/meeting/BuyerStream';
import colors from '../../_libs/design/colors';

export function Auction() {
  const roomId = 123;
  const userId = 4;
  const userNickname = '정예지';
  const userType = 'buyer';
  const auctionType = '일반';
  const title = '솔직히 이건 사야하는 것 아닌가요';
  const notice = '여긴 판매자가 채팅으로 입력한 공지사항입니다';

  return (
    <div css={{ display: 'flex', width: '100vw', backgroundColor: colors.backgroundLight }}>
      <div css={{ width: '75%', padding: '1.5rem 0.75rem 1.5rem 1.5rem' }}>
        <div css={{ backgroundColor: colors.backgroundLight2, padding: '1.5rem', borderRadius: '1.5rem' }}>
          <div>
            <Text content={'판매자 '} />
            <Text content={userNickname} type="bold" />
          </div>
          <Spacing rem="0.5" />
          <div css={{ display: 'flex', width: '100%', alignItems: 'center' }}>
            <div
              css={{
                backgroundColor: auctionType === '일반' ? colors.progress : colors.warn,
                color: colors.white,
                padding: '0.2rem 1rem 0.2rem 1rem',
                borderRadius: '1.5rem',
              }}
            >
              <Text content={auctionType} type="bold" />
            </div>
            <Spacing rem="0.5" dir="h" />
            <Text content={title} type="h2" />
          </div>
        </div>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: 'calc(100% - 10rem)',
            justifyContent: 'center',
          }}
        >
          <BuyerStream roomId={roomId} userId={userId} userType={userType} />
          <Spacing rem="1" />
          <div
            css={{
              color: colors.progress,
              overflow: 'hidden',
              padding: '0.75rem 1.5rem 0.75rem 1.5rem',
              borderRadius: '1.5rem',
              backgroundColor: colors.backgroundLight2,
            }}
          >
            <Text content={notice} type="bold" />
          </div>
        </div>
      </div>
      <div
        css={{
          width: '25%',
          minWidth: '25rem',
          maxWidth: '32rem',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem 1.5rem 1.5rem 0.75rem',
        }}
      >
        <AuctionSystem theme="light" />
        <Spacing rem="1.5" />
        <ChatRoom theme="light" userType="order" />
      </div>
    </div>
  );
}
