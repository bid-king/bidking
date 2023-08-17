/** @jsxImportSource @emotion/react */
import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import { HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { auctionEnd, descStart, live } from '../../../../api/live';
import { useAppSelector } from '../../../../store/hooks';
import colors from '../../../design/colors';

import { ConfirmButton } from '../../common/ConfirmButton';

export function BidCtrl({ socket, liveStatus, auctionRoomId, itemId, setCurrId, setLiveStatus }: Props) {
  const { accessToken } = useAppSelector(state => state.user);
  const navigate = useNavigate();
  if (liveStatus === 'beforeDesc') {
    return (
      <ConfirmButton
        label={'다음 상품 소개 시작하기'}
        onClick={() => {
          descStart(auctionRoomId, accessToken).then(() => {
            setLiveStatus('inDesc');
          });
        }}
      />
    );
  }
  if (liveStatus === 'inDesc')
    return (
      <ConfirmButton
        label={'상품 경매 시작하기'}
        color="progress"
        onClick={() => {
          live(socket.current).send.bidStart(auctionRoomId);
          setLiveStatus('inAuction');
        }}
      />
    );
  if (liveStatus === 'inAuction') return <ConfirmButton disable={true} label={'경매 진행 중...'} />;
  else
    return (
      <ConfirmButton
        color={'warn'}
        label={'경매 종료하고 나가기'}
        onClick={async () => {
          await auctionEnd(auctionRoomId, accessToken);
          live(socket.current).send.leave(auctionRoomId);
          navigate('/seller');
        }}
      />
    );
}

interface Props extends HTMLAttributes<HTMLButtonElement> {
  liveStatus: 'beforeStart' | 'inAuction' | 'inDesc' | 'beforeDesc' | 'end';
  auctionRoomId: number;
  itemId: number;
  socket: MutableRefObject<Socket | null>;
  setLiveStatus: Dispatch<SetStateAction<'inAuction' | 'beforeDesc' | 'inDesc' | 'end'>>;
  setCurrId: Dispatch<SetStateAction<number>>;
}
