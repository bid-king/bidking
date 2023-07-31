/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../design/colors';
import { Input } from '../common/Input';
import { RoundButton } from '../common/RoundButton';
import { Spacing } from '../common/Spacing';
import { ChatMessage } from './ChatMessage';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
  chatInput: 'light' | 'dark';
}

export function ChatRoom({ theme = 'light', chatInput = 'light' }: Props) {
  return (
    <div
      css={{
        width: '100%',
        height: '45vh',
        borderRadius: '1rem',
        padding: '1rem',
        position: 'relative',
        ...THEME_VARIANTS[theme],
      }}
    >
      <div>
        <ChatMessage nickname="김동현" msg="또 나야?" />
      </div>
      <div
        className="inputArea"
        css={{
          width: 'calc(100% - 2rem)',
          left: '1rem',
          bottom: '1rem',
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div css={{ display: 'flex', width: '100%' }}>
          <Input placeholder={`${CHAT_INPUT[chatInput].chatPlaceHolder}`} shape="round" size="small" />
          <Spacing dir="h" rem="1" />
          <RoundButton label={`${CHAT_INPUT[chatInput].chatBtn}`} size="small" />
        </div>
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: {
    backgroundColor: colors.backgroundLight2,
  },
  dark: {
    backgroundColor: colors.backgroundDark2,
    color: colors.white,
  },
};

const CHAT_INPUT = {
  light: {
    chatPlaceHolder: '',
    chatBtn: '➡',
  },
  dark: {
    chatPlaceHolder: '',
    chatBtn: '공지',
  },
};
