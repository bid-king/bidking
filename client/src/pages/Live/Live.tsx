/** @jsxImportSource @emotion/react */
import React from 'react';
import { ChatRoom } from '../../_libs/components/auction/ChatRoom';
import { AuctionNotice } from '../../_libs/components/auctionsystem/AuctionNotice';
import { AuctionSystem } from '../../_libs/components/auctionsystem/AuctionSystem';
import { AuctionTitle } from '../../_libs/components/auctionsystem/AuctionTitle';
import { Spacing } from '../../_libs/components/common/Spacing';
import { OrderStream } from '../../_libs/components/meeting/OrderStream';
import colors from '../../_libs/design/colors';
import { useLiveEnter } from '../../_libs/hooks/useLiveEnter';
import { useLiveSocketConnection } from '../../_libs/hooks/useLiveSocketConnection';

export function Live() {
  const { userId, auctionRoomId, auctionRoomType, nickname, title, liveAuthErr } = useLiveEnter();
  const { socket, socketConnectionErr } = useLiveSocketConnection(auctionRoomId);

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
          <OrderStream
            err={socketConnectionErr || liveAuthErr || null}
            auctionId={auctionRoomId}
            userId={userId}
            userType="order"
          />
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
        <ChatRoom theme="light" userType="order" socket={socket} />
      </div>
    </div>
  );
}
