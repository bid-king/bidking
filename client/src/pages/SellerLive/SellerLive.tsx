/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import { AuctionNotice } from '../../_libs/components/auctionSystem/chatRoom/AuctionNotice';
import { AuctionSystem } from '../../_libs/components/auctionSystem/AuctionSystem';
import { AuctionHeader } from '../../_libs/components/auctionSystem/auctionHeader/AuctionHeader';
import { Spacing } from '../../_libs/components/common/Spacing';
import { SellerStream } from '../../_libs/components/meeting/SellerStream';
import colors from '../../_libs/design/colors';
import { useLiveConnection } from '../../_libs/hooks/useLiveConnection';

export function SellerLive() {
  const {
    SOCKET,
    userId,
    auctionRoomId,
    auctionRoomType,
    nickname,
    sellerNickname,
    title,
    liveAuthErr,
    error,
    pub,
    cameraToggle,
    micToggle,
    leaveOpenvidu,
  } = useLiveConnection();

  return (
    <div css={{ display: 'flex', width: '100%', backgroundColor: colors.backgroundDark }}>
      <div css={{ width: '100%', padding: '1rem 0.25rem 0.5rem 0.5rem' }}>
        <div css={{ display: 'flex', position: 'fixed', bottom: '1rem', width: 'calc(100vw - 22.5rem)' }}>
          <div>
            <AuctionHeader
              userType="seller"
              theme="dark"
              sellerNickname={sellerNickname}
              auctionRoomType={auctionRoomType}
              title={title}
            />
          </div>
        </div>
        <div css={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {pub && (
            <SellerStream
              auctionRoomId={auctionRoomId}
              userId={userId}
              userType={'seller'}
              publisher={pub}
              onChangeCameraStatus={cameraToggle}
              onChangeMicStatus={micToggle}
            />
          )}
          <Spacing rem="0.5" />
          <AuctionNotice auctionRoomId={auctionRoomId} userType="seller" socket={SOCKET} />
        </div>
      </div>
      <div
        css={{
          minWidth: '20.5rem',
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem 0.5rem 0.5rem 0.25rem',
        }}
      >
        <AuctionSystem
          userType="seller"
          nickname={nickname}
          auctionRoomId={auctionRoomId}
          theme="dark"
          socket={SOCKET}
        />
      </div>
    </div>
  );
}
