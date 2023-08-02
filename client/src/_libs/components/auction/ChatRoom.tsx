/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../design/colors';
import { IconButton } from '../common/IconButton';
import { Input } from '../common/Input';
import { RoundButton } from '../common/RoundButton';
import { Spacing } from '../common/Spacing';
import { ChatMessage } from './ChatMessage';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
  userType: 'order' | 'seller';
}

export function ChatRoom({ theme = 'light', userType = 'order' }: Props) {
  return (
    <div
      css={{
        width: '100%',
        minHeight: '45vh',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        position: 'relative',
        ...THEME_VARIANT[theme],
        overflowY: 'auto',
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
          bottom: '1.5rem',
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {userType === 'order' && (
          <div css={{ width: '100%' }}>
            <form>
              <div css={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <Input id="chat" placeholder="" shape="round" size="small" />
                <Spacing rem="0.5" dir="h" />
                <IconButton type="arrowRight" color="black" background="confirm" size="small" />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

const THEME_VARIANT = {
  light: {
    backgroundColor: colors.backgroundLight2,
  },
  dark: {
    backgroundColor: colors.backgroundDark2,
    color: colors.white,
  },
};
