/** @jsxImportSource @emotion/react */
import React from 'react';
import { ChatRoom } from '../../_libs/components/auctionsystem/chatRoom/ChatRoom';
import { AuctionNotice } from '../../_libs/components/auctionsystem/AuctionNotice';
import { AuctionSystem } from '../../_libs/components/auctionsystem/AuctionSystem';
import { AuctionHeader } from '../../_libs/components/auctionsystem/AuctionHeader';
import { Spacing } from '../../_libs/components/common/Spacing';
import { SellerStream } from '../../_libs/components/meeting/SellerStream';
import colors from '../../_libs/design/colors';
import { useSocket } from '../../_libs/hooks/useSocket';

export function SellerLive() {
  const auctionRoomId = 123;
  const auctionRoomType = '네덜란드';
  const title = '떡락각이다';
  const userId = 4;
  const nickname = '정예지';
  const userType = 'seller';
  const notice = '여긴 판매자가 채팅으로 입력한 공지사항입니다';
  // const { accessToken } = useAppSelector(state => state.user);
  // const { userId, auctionRoomId, auctionRoomType, nickname, title, liveAuthErr } = useLiveEnter(accessToken);
  const { SOCKET, error } = useSocket(auctionRoomId, nickname);
  return (
    <div css={{ display: 'flex', width: '100%', backgroundColor: colors.backgroundDark }}>
      <div css={{ width: '100%', padding: '0 0.25rem 0.5rem 0.5rem' }}>
        <div css={{ display: 'flex', position: 'fixed', bottom: '1rem', width: 'calc(100vw - 22.5rem)' }}>
          <div>
            <AuctionHeader
              type="seller"
              theme="dark"
              nickname={nickname}
              auctionRoomType={auctionRoomType}
              title={title}
            />
          </div>
        </div>
        <div css={{ width: '100%', height: '100%' }}>
          <SellerStream auctionRoomId={auctionRoomId} userId={userId} userType={userType} />
          <Spacing rem="0.5" />
          <AuctionNotice userType="seller" socket={SOCKET} />
        </div>
      </div>
      <div
        css={{
          minWidth: '20.5rem',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 0.5rem 0.5rem 0.25rem',
        }}
      >
        <AuctionSystem nickname={nickname} auctionRoomId={auctionRoomId} theme="dark" socket={SOCKET} />
      </div>
    </div>
  );
}
