/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';
import { Text } from '../../common/Text';
import colors from '../../../design/colors';
import { Spacing } from '../../common/Spacing';

interface Props extends HTMLAttributes<HTMLDivElement> {
  type?: 'normal' | 'notice';
  nickname: string;
  msg: string;
}

export function ChatMessage({ type = 'normal', nickname, msg }: Props) {
  return (
    <div css={{ ...COLOR_VARIANT[type], lineHeight: '1.5', display: 'flex' }}>
      <div css={{ width: '5rem' }}>
        <Text type="bold" content={nickname} />
      </div>
      <div>
        <Text content={' ' + msg} />
      </div>
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
