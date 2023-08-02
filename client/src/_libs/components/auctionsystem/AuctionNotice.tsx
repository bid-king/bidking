/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes } from 'react';
import colors from '../../design/colors';
import { Text } from '../../components/common/Text';
import { Input } from '../common/Input';

export function AuctionNotice({ notice, userType }: Props) {
  return (
    <div
      css={{
        color: colors.progress,
        overflow: 'hidden',
        padding: '0.75rem 1.5rem 0.75rem 1.5rem',
        borderRadius: '1.5rem',
        backgroundColor: userType === 'order' ? colors.backgroundLight2 : colors.backgroundDark2,
      }}
    >
      {userType === 'order' ? (
        <Text content={notice} type="bold" />
      ) : (
        <Input placeholder="공지를 입력하세요." size="large" theme="dark" shape="round" />
      )}
    </div>
  );
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  notice: string;
  userType: 'order' | 'seller';
}
