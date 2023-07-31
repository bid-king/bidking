/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../../design/colors';
import { HTMLAttributes } from 'react';
import { Icon } from './Icon';

export function IconButton({ type, background = 'transparent', color = 'lightgrey', size = 'small' }: Props) {
  return (
    <button
      css={{
        cursor: 'pointer',
        borderRadius: '3rem',
        textAlign: 'center',
        ...BACKGROUND_VARIANT[background],
        ...SIZE_VARIANT[size],
      }}
    >
      <Icon type={type} color={color} rem={size === 'small' ? '1' : '2'} />
    </button>
  );
}
const BACKGROUND_VARIANT = {
  white: { backgroundColor: colors.white, border: '1px solid transparent' },
  black: { backgroundColor: colors.backgroundDark3, border: '1px solid transparent' },
  dark: { backgroundColor: colors.backgroundDark3, border: '1px solid transparent' },
  light: { backgroundColor: colors.backgroundLight2, border: '1px solid transparent' },
  transparent: { backgroundColor: 'transparent', border: '1px solid transparent' },
};
const SIZE_VARIANT = {
  small: {
    height: '1.75rem',
    width: '1.75rem',
  },
  large: {
    height: '2rem',
    width: '2rem',
  },
};

interface Props extends HTMLAttributes<HTMLButtonElement> {
  color: 'light' | 'dark' | 'black' | 'white' | 'lightgrey' | 'confirm' | 'warn' | 'progress' | 'ok';
  background?: 'light' | 'dark' | 'black' | 'white' | 'transparent';
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