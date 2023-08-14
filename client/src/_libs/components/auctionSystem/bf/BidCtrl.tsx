/** @jsxImportSource @emotion/react */
import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import { HTMLAttributes } from 'react';
import { Socket } from 'socket.io-client';
import { live, liveStart } from '../../../../api/live';
import { useAppSelector } from '../../../../store/hooks';

import { ConfirmButton } from '../../common/ConfirmButton';

export function BidCtrl({ socket, liveStatus, auctionRoomId, itemId, setCurrId, setLiveStatus }: Props) {
  const { accessToken } = useAppSelector(state => state.user);

  if (liveStatus === 'beforeStart')
    return (
      <ConfirmButton
        label={'경매 개시'}
        onClick={() => {
          console.log('ZZ');
          liveStart(auctionRoomId, itemId, accessToken).then(() => {
            setLiveStatus('pending');
          });
        }}
      />
    );
  if (liveStatus === 'inAuction') return <ConfirmButton disable={true} label={'경매 진행 중...'} />;
  if (liveStatus === 'pending')
    return (
      <ConfirmButton
        label={'다음 아이템 경매 시작'}
        onClick={() => socket.current?.emit('start', { roomId: auctionRoomId })}
      />
    );
  else return <ConfirmButton disable={true} label={'모든 경매가 종료되었어요.'} />;
}

interface Props extends HTMLAttributes<HTMLButtonElement> {
  liveStatus: 'beforeStart' | 'inAuction' | 'pending' | 'end';
  auctionRoomId: number;
  itemId: number;
  socket: MutableRefObject<Socket | null>;
  setLiveStatus: Dispatch<SetStateAction<'beforeStart' | 'inAuction' | 'pending' | 'end'>>;
  setCurrId: Dispatch<SetStateAction<number>>;
}
