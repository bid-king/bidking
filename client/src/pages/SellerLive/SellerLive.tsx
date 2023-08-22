/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import { AuctionNotice } from '../../_libs/components/auctionSystem/chatRoom/AuctionNotice';
import { AuctionSystem } from '../../_libs/components/auctionSystem/AuctionSystem';
import { AuctionHeader } from '../../_libs/components/auctionSystem/auctionHeader/AuctionHeader';
import { Spacing } from '../../_libs/components/common/Spacing';
import { SellerStream } from '../../_libs/components/meeting/SellerStream';
import colors from '../../_libs/design/colors';
import { useLiveConnection } from '../../_libs/hooks/useLiveConnection';
import { useAlert } from '../../_libs/hooks/useAlert';

export function SellerLive() {
  const {
    SOCKET,
    userId,
    auctionRoomId,
    auctionRoomType,
    nickname,
    sellerNickname,
    title,
    seller,
    liveAuthErr,
    error,
  } = useLiveConnection();

  const { Alert, alertTrigger } = useAlert('error');
  return (
    <div css={{ display: 'flex', width: '100%', height: 'calc(100vh)', backgroundColor: colors.backgroundDark }}>
      <div css={{ width: '100%', padding: '1rem 0.25rem 0.5rem 0.5rem' }}>
        <div css={{ display: 'flex', width: '100%' }}>
          <AuctionHeader
            theme="dark"
            sellerNickname={sellerNickname}
            auctionRoomType={auctionRoomType}
            title={title}
            userType="seller"
          />
        </div>
        <Spacing rem="0.5" />
        <div css={{ width: '100%' }}>
          <div css={{ width: '100%', height: '75%', maxHeight: '75vh', overflow: 'hidden' }}>
            {<SellerStream auctionRoomId={auctionRoomId} userId={userId} />}
          </div>
        </div>
        <Spacing rem="0.5" />
        <div css={{ position: 'absolute', bottom: '1rem', width: 'calc(100% - 21rem)' }}>
          <AuctionNotice auctionRoomId={auctionRoomId} userType="seller" socket={SOCKET} />
        </div>
      </div>
      <div
        css={{
          minWidth: '20.5rem',
          padding: '1rem 0.5rem 0.5rem 0.25rem',
        }}
      >
        <AuctionSystem
          userType="seller"
          nickname={nickname}
          auctionRoomId={auctionRoomId}
          theme="dark"
          socket={SOCKET}
          alertTrigger={alertTrigger}
        />
      </div>
    </div>
  );
}
