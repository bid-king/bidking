/** @jsxImportSource @emotion/react */
import React, { MouseEvent } from 'react';
import colors from '../../design/colors';
import { HTMLAttributes } from 'react';
import { Icon } from './Icon';

export function IconButton({ type, background = 'transparent', color = 'lightgrey', size = 'small', onClick }: Props) {
  return (
    <button
      css={{
        type: 'button',
        cursor: 'pointer',
        borderRadius: '3rem',
        textAlign: 'center',
        lineHeight: '0',
        ...BACKGROUND_VARIANT[background],
        ...SIZE_VARIANT[size],
      }}
      onClick={onClick}
    >
      <Icon type={type} color={color} rem={size === 'small' ? '1.25' : '2'} />
    </button>
  );
}
const BACKGROUND_VARIANT = {
  white: { backgroundColor: colors.white, border: '1px solid transparent' },
  black: { backgroundColor: colors.backgroundDark3, border: '1px solid transparent' },
  dark: { backgroundColor: colors.backgroundDark3, border: '1px solid transparent' },
  light: { backgroundColor: colors.backgroundLight2, border: '1px solid transparent' },
  transparent: { backgroundColor: 'transparent', border: '1px solid transparent' },
  confirm: { backgroundColor: colors.confirm, border: '1px solid transparent' },
  warn: { backgroundColor: colors.warn, border: '1px solid transparent' },
  progress: { backgroundColor: colors.progress, border: '1px solid transparent' },
  ok: { backgroundColor: colors.ok, border: '1px solid transparent' },
};
const SIZE_VARIANT = {
  small: {
    height: '1.75rem',
    width: '3.5rem',
  },
  large: {
    height: '2rem',
    width: '4rem',
  },
};

interface Props extends HTMLAttributes<HTMLButtonElement> {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  color: 'light' | 'dark' | 'black' | 'white' | 'lightgrey' | 'confirm' | 'warn' | 'progress' | 'ok';
  background?: 'light' | 'dark' | 'black' | 'white' | 'transparent' | 'confirm' | 'warn' | 'progress' | 'ok';
  size: 'small' | 'large';
  type:
    | 'arrowRight'
    | 'check'
    | 'confirm'
    | 'gavel'
    | 'hamburger'
    | 'img'
    | 'more'
    | 'noti'
    | 'question'
    | 'search'
    | 'send'
    | 'shorten'
    | 'starFilled'
    | 'star'
    | 'unable';
}
