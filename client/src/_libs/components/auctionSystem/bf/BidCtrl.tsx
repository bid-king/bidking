/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { HTMLAttributes } from 'react';
import { itemStart, live } from '../../../../api/live';
import { useAppSelector } from '../../../../store/hooks';

import { ConfirmButton } from '../../common/ConfirmButton';

export function BidCtrl({ liveStatus, auctionRoomId, itemId }: Props) {
  const { accessToken } = useAppSelector(state => state.user);

  if (liveStatus === 'beforeStart')
    return <ConfirmButton label={'아이템 경매 시작'} onClick={() => itemStart(auctionRoomId, itemId, accessToken)} />;
  if (liveStatus === 'inAuction') return <ConfirmButton disable={true} label={'경매 진행 중...'} />;
  if (liveStatus === 'pending')
    return (
      <ConfirmButton label={'다음 아이템 경매 시작'} onClick={() => itemStart(auctionRoomId, itemId, accessToken)} />
    );
  else return <ConfirmButton disable={true} label={'경매 종료'} />;
}

interface Props extends HTMLAttributes<HTMLButtonElement> {
  liveStatus: 'beforeStart' | 'inAuction' | 'pending' | 'end';
  auctionRoomId: number;
  itemId: number;
}
