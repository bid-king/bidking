/** @jsxImportSource @emotion/react */
import React from 'react';
import { ChatRoom } from '../../_libs/components/auctionsystem/chatRoom/ChatRoom';
import { AuctionSystem } from '../../_libs/components/auctionsystem/AuctionSystem';
import { AuctionHeader } from '../../_libs/components/auctionsystem/AuctionHeader';
import { Spacing } from '../../_libs/components/common/Spacing';
import { OrderStream } from '../../_libs/components/meeting/OrderStream';
import colors from '../../_libs/design/colors';
import { useLiveEnter } from '../../_libs/hooks/useLiveEnter';
import { useSocket } from '../../_libs/hooks/useSocket';
import { AuctionNotice } from '../../_libs/components/auctionsystem/AuctionNotice';

export function Live() {
  const userId = 1;
  const auctionRoomId = 1;
  const auctionRoomType = 'GENERAL';
  const nickname = '윤다정';
  const title = '또 나야?';
  const liveAuthErr = null;

  // const { accessToken } = useAppSelector(state => state.user);
  // const { userId, auctionRoomId, auctionRoomType, nickname, title, liveAuthErr } = useLiveEnter(accessToken);
  const { SOCKET, error } = useSocket(auctionRoomId, nickname);

  return (
    <div css={{ display: 'flex', width: '100%', backgroundColor: colors.backgroundLight }}>
      <div css={{ width: '100%', padding: '0 0.25rem 0.5rem 0.5rem' }}>
        <div css={{ display: 'flex', position: 'fixed', bottom: '1rem', width: 'calc(100vw - 22.5rem)' }}>
          <div css={{ width: 'auto', maxWidth: '33vw' }}>
            <AuctionHeader
              theme="light"
              nickname={nickname}
              auctionRoomType={auctionRoomType}
              title={title}
              type="order"
            />
          </div>
        </div>
        <div css={{ width: '100%', height: '100%' }}>
          <OrderStream
            err={error || liveAuthErr || null}
            auctionRoomId={auctionRoomId}
            userId={userId}
            userType="order"
          />
          <Spacing rem="0.5" />
          <AuctionNotice userType="order" socket={SOCKET} />
        </div>
      </div>
      <div
        css={{
          minWidth: '18rem',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 0.5rem 0.5rem 0.25rem',
        }}
      >
        <AuctionSystem nickname={nickname} auctionRoomId={auctionRoomId} theme="light" socket={SOCKET} />
      </div>
    </div>
  );
}
