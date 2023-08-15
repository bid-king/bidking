/** @jsxImportSource @emotion/react */
import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import { HTMLAttributes } from 'react';
import { Socket } from 'socket.io-client';
import { descStart, live } from '../../../../api/live';
import { useAppSelector } from '../../../../store/hooks';
import colors from '../../../design/colors';

import { ConfirmButton } from '../../common/ConfirmButton';

export function BidCtrl({ socket, liveStatus, auctionRoomId, itemId, setCurrId, setLiveStatus }: Props) {
  const { accessToken } = useAppSelector(state => state.user);

  if (liveStatus === 'beforeDesc') {
    return (
      <ConfirmButton
        label={'다음 아이템 소개 시작하기'}
        onClick={() => {
          descStart(auctionRoomId, itemId, accessToken).then(() => {
            setLiveStatus('inDesc');
          });
        }}
      />
    );
  }
  if (liveStatus === 'inDesc')
    return (
      <ConfirmButton
        label={'아이템 경매 시작하기'}
        color="progress"
        onClick={() => {
          live(socket.current).send.bidStart(auctionRoomId);
          setLiveStatus('inAuction');
        }}
      />
    );
  if (liveStatus === 'inAuction') return <ConfirmButton disable={true} label={'경매 진행 중...'} />;
  else return <ConfirmButton disable={true} label={'모든 경매가 종료되었어요.'} />;
}

interface Props extends HTMLAttributes<HTMLButtonElement> {
  liveStatus: 'beforeStart' | 'inAuction' | 'inDesc' | 'beforeDesc' | 'end';
  auctionRoomId: number;
  itemId: number;
  socket: MutableRefObject<Socket | null>;
  setLiveStatus: Dispatch<SetStateAction<'inAuction' | 'beforeDesc' | 'inDesc' | 'end'>>;
  setCurrId: Dispatch<SetStateAction<number>>;
}
