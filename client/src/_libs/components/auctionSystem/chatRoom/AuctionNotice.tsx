/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, MutableRefObject, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import colors from '../../../design/colors';
import { Text } from '../../common/Text';
import { Input } from '../../common/Input';
import { Spacing } from '../../common/Spacing';
import { live, liveItemList } from '../../../../api/live';
import { RoundButton } from '../../common/RoundButton';
import { bidPriceParse } from '../../../util/bidPriceParse';

export function AuctionNotice({ auctionRoomId, socket, userType }: Props) {
  const [itemList, setItemList] = useState<liveItemList | undefined>(undefined);
  const [notice, setNotice] = useState<string[]>(['']);
  const [noticeInput, setNoticeInput] = useState<string>('');
  useEffect(() => {
    socket.current?.on('init', ({ currentItemId, itemList }) => {
      setItemList(itemList);
    }); //API 요청 성공시, 이 데이터가 소켓에서옴

    socket.current?.on('notice', ({ msg }) => {
      setNotice([msg, ...notice]);
    }); //판매자 공지 받음
    socket.current?.on('successBid', ({ itemId, userId, nickname, price, time }) => {
      //TODO: 상품 뭔지 알려줘야함
      const result = itemList?.find(item => item.itemId === itemId);
      const msg = `<SYSTEM> ${result?.name} 상품이 ${nickname}님께 ${bidPriceParse(price)}원에 낙찰되었어요.`;
      setNotice([msg, ...notice]);
    }); //낙찰
    socket.current?.on('failBid', ({ itemId }) => {
      //TODO: 상품 뭔지 알려줘야함
      const result = itemList?.find(item => item.itemId === itemId);
      const msg = `<SYSTEM> ${result?.name} 상품이 유찰되었어요.`;
      setNotice([msg, ...notice]);
    }); //유찰
  }, [socket.current, notice]);
  return (
    <>
      {userType === 'seller' && (
        <>
          <Spacing rem="0.5" />
          <form
            autoComplete="off"
            css={{ display: 'flex' }}
            onSubmit={e => {
              e.preventDefault();
              live(socket.current).send.notice(auctionRoomId, noticeInput.trim());
              setNoticeInput('');
            }}
          >
            <Input
              placeholder="공지사항을 입력하세요."
              size="large"
              theme="dark"
              shape="round"
              value={noticeInput}
              onChange={e => setNoticeInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'enter') {
                  live(socket.current).send.notice(auctionRoomId, noticeInput.trim());
                  setNoticeInput('');
                }
              }}
            />
            <Spacing rem="0.5" dir="h" />
            <RoundButton
              type="button"
              size="large"
              color="confirm"
              label="보내기"
              onClick={() => {
                live(socket.current).send.notice(auctionRoomId, noticeInput);
                setNoticeInput('');
              }}
            />
          </form>
          <Spacing rem="1" />
        </>
      )}

      <div
        css={{
          padding: '1rem',
          height: '33vh',
          borderRadius: '1.85rem',
          backgroundColor: userType === 'order' ? colors.backgroundLight2 : colors.backgroundDark2,
          overflow: 'hidden',
        }}
      >
        <Spacing rem="0.5" />
        {notice.map((item, idx) => {
          if (item.indexOf('SYSTEM') === 1)
            if (item.indexOf('상품이 유찰되었어요.') > 0)
              return (
                <div key={idx} css={{ color: colors.disabled }}>
                  <Text content={item} type="bold" />
                  <Spacing rem="0.25" />
                </div>
              );
          if (item.indexOf('SYSTEM') === 1) {
            if (item.indexOf('원에 낙찰되었어요.') > 0)
              return (
                <div key={idx} css={{ color: colors.ok }}>
                  <Text content={item} type="bold" />
                  <Spacing rem="0.25" />
                </div>
              );
          }
          return (
            <div key={idx} css={{ color: userType === 'order' ? colors.black : colors.white }}>
              <Text content={item} />
              <Spacing rem="0.25" />
            </div>
          );
        })}
      </div>
    </>
  );
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  auctionRoomId: number;
  socket: MutableRefObject<Socket | null>;
  userType: 'order' | 'seller';
}
