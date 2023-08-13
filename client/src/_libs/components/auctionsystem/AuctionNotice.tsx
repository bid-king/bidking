/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, MutableRefObject, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import colors from '../../design/colors';
import { Text } from '../../components/common/Text';
import { Input } from '../common/Input';
import { Spacing } from '../common/Spacing';
import { live, liveItemList } from '../../../api/live';

export function AuctionNotice({ auctionRoomId, socket, userType }: Props) {
  const [itemList, setItemList] = useState<liveItemList | undefined>(undefined);
  const [notice, setNotice] = useState<string>('');
  useEffect(() => {
    const SOCKET_API = live(socket.current);
    SOCKET_API.send.notice(auctionRoomId, notice);

    socket.current?.on('init', ({ currentItemId, itemList }) => {
      setItemList(itemList);
    }); //API 요청 성공시, 이 데이터가 소켓에서옴
    socket.current?.on('notice', data => {
      setNotice(data);
    }); //판매자 공지 받음
    socket.current?.on('successBid', ({ itemId, userId, nickname, price, time }) => {
      const cur = itemList?.filter(el => el.itemId === itemId);
      setNotice(`<SYSTEM> ${cur && cur[0].name} 상품이 ${nickname}님께 ${price}원에 낙찰되었습니다.`);
    }); //낙찰
    socket.current?.on('failBid', ({ itemId }) => {
      const cur = itemList?.filter(el => el.itemId === itemId);
      setNotice(`<SYSTEM> ${cur && cur[0].name}  상품이 유찰되었습니다.`);
    }); //유찰
  }, [socket.current, notice]);
  return (
    <div
      css={{
        color: colors.progress,
        overflow: 'hidden',
        padding: '1rem',
        borderRadius: '1.5rem',
        backgroundColor: userType === 'order' ? colors.backgroundLight2 : colors.backgroundDark2,
      }}
    >
      {userType === 'order' ? (
        <Text content={notice} type="bold" />
      ) : (
        <div>
          <Text content={notice} type="bold" />
          <Spacing rem="1.5" />
          <form
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <Input placeholder="공지를 입력하세요." size="small" theme="dark" shape="square" />
          </form>
        </div>
      )}
    </div>
  );
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  auctionRoomId: number;
  socket: MutableRefObject<Socket | null>;
  userType: 'order' | 'seller';
}
