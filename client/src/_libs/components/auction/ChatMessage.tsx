/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';
import { Text } from '../common/Text';
import colors from '../../design/colors';

interface Props extends HTMLAttributes<HTMLDivElement> {
  message?: string;
  bidProgress?: string;
  bidSuccess?: string;
}

export function ChatMessage({
  message = '이름: 저는 입찰왕입니다.',
  bidProgress = '<낙찰> 입찰왕님 30,000원',
  bidSuccess = '<입찰> 입찰왕님 23,000원',
}: Props) {
  return (
    <div
      className="messageBox"
      css={{
        padding: '1rem',
      }}
    >
      <Text type="p" content={message} />
      <Text type="p" content={bidProgress} css={{ color: colors.ok }} />
      <Text type="p" content={bidSuccess} css={{ color: colors.confirm }} />
    </div>
  );
}
