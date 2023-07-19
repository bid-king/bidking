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
        position: 'relative',
        ...THEME_VARIANTS[theme],
      }}
    >
      <div
        className="messageBox"
        css={{
          margin: '1rem',
        }}
      >
        {message}
      </div>
      <div
        className="inputArea"
        css={{
          bottom: '0',
          position: 'absolute',
          margin: '1rem',
        }}
      >
        <Input placeholder={'asdasd'} shape="round" />
        <RoundButton label={'asdf'} />
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
