/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, MutableRefObject, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import colors from '../../../design/colors';
import { Text } from '../../common/Text';
import { Input } from '../../common/Input';
import { Spacing } from '../../common/Spacing';
import { live, liveItemList } from '../../../../api/live';
import { RoundButton } from '../../common/RoundButton';

export function AuctionNotice({ auctionRoomId, socket, userType }: Props) {
  const [itemList, setItemList] = useState<liveItemList | undefined>(undefined);
  const [notice, setNotice] = useState<string[]>(['']);
  const [noticeInput, setNoticeInput] = useState<string>('');
  useEffect(() => {
    socket.current?.on('init', ({ currentItemId, itemList }) => {
      setItemList(itemList);
    }); //API 요청 성공시, 이 데이터가 소켓에서옴

    socket.current?.on('notice', ({ msg }) => {
      setNotice([msg, ...notice].slice(4));
    }); //판매자 공지 받음
    socket.current?.on('successBid', ({ itemId, userId, nickname, price, time }) => {
      //TODO: 상품 뭔지 알려줘야함
      const result = itemList?.find(item => item.itemId === itemId);
      const msg = `<SYSTEM> ${result?.name} 상품이 ${nickname}님께 ${price}원에 낙찰되었습니다.`;
      setNotice([msg, ...notice].slice(4));
    }); //낙찰
    socket.current?.on('failBid', ({ itemId }) => {
      //TODO: 상품 뭔지 알려줘야함
      const result = itemList?.find(item => item.itemId === itemId);
      const msg = `<SYSTEM> ${result?.name} 상품이 유찰되었습니다.`;
      setNotice([msg, ...notice].slice(4));
    }); //유찰
  }, [socket.current, notice]);
  return (
    <>
      {userType === 'seller' && (
        <>
          <Spacing rem="0.5" />
          <form
            onSubmit={e => {
              e.preventDefault();
              auctionRoomId && live(socket.current).send.notice(auctionRoomId, noticeInput);
              setNoticeInput('');
            }}
            css={{ display: 'flex' }}
          >
            <Input
              placeholder="공지를 입력하세요."
              size="large"
              theme="dark"
              shape="round"
              onChange={e => setNoticeInput(e.target.value)}
            />
            <Spacing rem="0.5" dir="h" />
            <RoundButton
              type="submit"
              size="large"
              color="confirm"
              label="공지"
              onClick={() => {
                auctionRoomId && live(socket.current).send.notice(auctionRoomId, noticeInput);
                setNoticeInput('');
              }}
            />
          </form>
          <Spacing rem="1" />
        </>
      )}

      <div
        css={{
          color: colors.confirm,
          padding: '1rem',
          borderRadius: '1.5rem',
          backgroundColor: userType === 'order' ? colors.backgroundLight2 : colors.backgroundDark2,
        }}
      >
        <Spacing rem="0.5" />
        {notice.map((item, idx) => (
          <>
            <Text key="idx" content={item} type="bold" />
            <Spacing rem="0.25" />
          </>
        ))}
      </div>
    </>
  );
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  auctionRoomId: number | null;
  socket: MutableRefObject<Socket | null>;
  userType: 'order' | 'seller';
}
