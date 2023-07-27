/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../design/colors';
import { Input } from '../common/Input';
import { RoundButton } from '../common/RoundButton';
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
        height: '28.97rem',
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
          width: '100%',
          left: '0.5rem',
          bottom: '1rem',
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          css={{
            width: '100%',
            marginRight: '1rem',
            display: 'flex',
          }}
        >
          <Input placeholder={`${CHAT_INTPUT[chatInput].chatPlaceHolder}`} shape="round" />
          <RoundButton label={`${CHAT_INTPUT[chatInput].chatBtn}`} />
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

const CHAT_INTPUT = {
  light: {
    chatPlaceHolder: '채팅을 입력해주세요',
    chatBtn: '입력',
  },
  dark: {
    chatPlaceHolder: '공지를 입력해주세요',
    chatBtn: '공지',
  },
};
