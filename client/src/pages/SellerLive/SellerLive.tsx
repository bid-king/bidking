/** @jsxImportSource @emotion/react */
import React from 'react';
import { ChatRoom } from '../../_libs/components/auction/ChatRoom';
import { AuctionNotice } from '../../_libs/components/auctionsystem/AuctionNotice';
import { AuctionSystem } from '../../_libs/components/auctionsystem/AuctionSystem';
import { AuctionTitle } from '../../_libs/components/auctionsystem/AuctionTitle';
import { Spacing } from '../../_libs/components/common/Spacing';
import { SellerStream } from '../../_libs/components/meeting/SellerStream';
import colors from '../../_libs/design/colors';

export function SellerLive() {
  const auctionId = 123;
  const auctionRoomType = '네덜란드';
  const title = '떡락각이다';
  const userId = 4;
  const nickname = '정예지';
  const userType = 'seller';
  const notice = '여긴 판매자가 채팅으로 입력한 공지사항입니다';

  return (
    <div css={{ display: 'flex', width: '100%', backgroundColor: colors.backgroundDark }}>
      <div css={{ width: '75%', padding: '1.5rem 0.75rem 1.5rem 1.5rem' }}>
        <AuctionTitle theme="dark" nickname={nickname} auctionRoomType={auctionRoomType} title={title} />
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: 'calc(100% - 10rem)',
            justifyContent: 'center',
          }}
        >
          <SellerStream auctionId={auctionId} userId={userId} userType={userType} />
          <Spacing rem="1" />
          <AuctionNotice notice={notice} userType={userType} />
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
        <AuctionSystem theme="dark" />
        <Spacing rem="1.5" />
        {/* <ChatRoom theme="dark" userType="seller" /> */}
      </div>
    </div>
  );
}
