/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, MutableRefObject, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import colors from '../../design/colors';
import { Text } from '../../components/common/Text';
import { Input } from '../common/Input';
import { Spacing } from '../common/Spacing';

export function AuctionNotice({ socket, userType }: Props) {
  const [notice, setNotice] = useState<string>('');
  useEffect(() => {
    socket.current?.on('notice', data => {
      setNotice(data);
    });
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
          <Input placeholder="공지를 입력하세요." size="small" theme="dark" shape="square" />
        </div>
      )}
    </div>
  );
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  socket: MutableRefObject<Socket | null>;
  userType: 'order' | 'seller';
}
