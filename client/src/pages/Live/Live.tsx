/** @jsxImportSource @emotion/react */
import React from 'react';

import { ChatRoom } from '../../_libs/components/auction/ChatRoom';
import { AuctionSystem } from '../../_libs/components/auctionsystem/AuctionSystem';
import { AuctionTitle } from '../../_libs/components/auctionsystem/AuctionTitle';
import { Spacing } from '../../_libs/components/common/Spacing';
import { OrderStream } from '../../_libs/components/meeting/OrderStream';
import colors from '../../_libs/design/colors';
import { useLiveEnter } from '../../_libs/hooks/useLiveEnter';
import { useSocket } from '../../_libs/hooks/useSocket';

export function Live() {
  const userId = 1;
  const auctionRoomId = 1;
  const auctionRoomType = 'GENERAL';
  const nickname = '김동현';
  const title = '아 이거 팔자';
  const liveAuthErr = null;

  // const { accessToken } = useAppSelector(state => state.user);
  // const { userId, auctionRoomId, auctionRoomType, nickname, title, liveAuthErr } = useLiveEnter(accessToken);
  const { SOCKET, error } = useSocket(auctionRoomId, nickname);

  return (
    <div css={{ display: 'flex', width: '100%', backgroundColor: colors.backgroundLight }}>
      <div css={{ width: '75%', padding: '1.5rem 0.75rem 1.5rem 1.5rem' }}>
        <AuctionTitle theme="light" nickname={nickname} auctionRoomType={auctionRoomType} title={title} />
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: 'calc(100% - 10rem)',
            justifyContent: 'center',
          }}
        >
          {/* <OrderStream
            err={socketConnectionErr || liveAuthErr || null}
            auctionId={auctionRoomId}
            userId={userId}
            userType="order"
          /> */}
          <Spacing rem="1" />
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
        <ChatRoom roomId={auctionRoomId} nickname={nickname} theme="light" userType="order" socket={SOCKET} />
      </div>
    </div>
  );
}
