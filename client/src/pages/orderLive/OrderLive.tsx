/** @jsxImportSource @emotion/react */
import React from 'react';
import { AuctionSystem } from '../../_libs/components/auctionSystem/AuctionSystem';
import { AuctionHeader } from '../../_libs/components/auctionSystem/auctionHeader/AuctionHeader';
import { Spacing } from '../../_libs/components/common/Spacing';
import { OrderStream } from '../../_libs/components/meeting/OrderStream';
import colors from '../../_libs/design/colors';
import { useLiveConnection } from '../../_libs/hooks/useLiveConnection';
import { AuctionNotice } from '../../_libs/components/auctionSystem/chatRoom/AuctionNotice';
import { Text } from '../../_libs/components/common/Text';

export function OrderLive() {
  const {
    userId,
    auctionRoomId,
    auctionRoomType,
    nickname,
    sellerNickname,
    title,
    liveAuthErr,
    seller,
    SOCKET,
    error,
  } = useLiveConnection();

  if (seller)
    return (
      <>
        <div
          css={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.backgroundLight,
          }}
        >
          <Text content={'판매자는 구매 페이지에 접속할 수 없어요'} />
        </div>
      </>
    );
  else
    return (
      <div css={{ display: 'flex', width: '100%', backgroundColor: colors.backgroundLight }}>
        <div css={{ width: '100%', padding: '0 0.25rem 0.5rem 0.5rem' }}>
          <div css={{ display: 'flex', position: 'fixed', bottom: '1rem', width: 'calc(100vw - 22.5rem)' }}>
            <div css={{ width: 'auto', maxWidth: '33vw' }}>
              <AuctionHeader
                theme="light"
                sellerNickname={sellerNickname}
                auctionRoomType={auctionRoomType}
                title={title}
                userType="order"
              />
            </div>
          </div>
          <div css={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {auctionRoomId && <OrderStream auctionRoomId={auctionRoomId} userId={userId} userType="order" />}
            <Spacing rem="0.5" />
            <AuctionNotice auctionRoomId={auctionRoomId} userType="order" socket={SOCKET} />
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
          <AuctionSystem
            userType="order"
            nickname={nickname}
            auctionRoomId={auctionRoomId}
            theme="light"
            socket={SOCKET}
          />
        </div>
      </div>
    );
}
