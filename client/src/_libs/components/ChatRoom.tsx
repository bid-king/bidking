/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';
import colors from '../design/colors';
import { Input } from './Input';
import { RoundButton } from './RoundButton';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
  message: string;
  systemLog: string;
  chatInput: 'light' | 'dark';
}

export function ChatRoom({
  theme = 'light',
  message = '이름: 저는 입찰왕입니다.',
  systemLog = '<낙찰> 입찰왕님 30,000원',
}: Props) {
  return (
    <div
      css={{
        width: '20rem',
        height: '28.97rem',
        borderRadius: '1rem',
        border: '1px solid black',
        ...THEME_VARIANTS[theme],
      }}
    >
      {message}
      <div className="inputArea">
        <Input placeholder="채팅을 입력해주세요" shape="round" />
        <RoundButton label={'입력'} />
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
