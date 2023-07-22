/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';
import { Text } from '../common/Text';
import colors from '../../design/colors';
import { Spacing } from '../common/Spacing';

interface Props extends HTMLAttributes<HTMLDivElement> {
  type?: 'normal' | 'notice';
  nickname: string;
  msg: string;
}

export function ChatMessage({ type = 'normal', nickname = '정예지', msg = '저는 입찰왕입니다.' }: Props) {
  return (
    <div css={{ ...COLOR_VARIANT[type] }}>
      <Text type="bold" content={nickname} />
      <Text content={' ' + msg} />
      <Spacing dir="v" rem="0.5" />
    </div>
  );
}

const COLOR_VARIANT = {
  notice: {
    color: colors.confirm,
  },
  normal: {
    color: 'inherit',
  },
};
