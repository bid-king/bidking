/** @jsxImportSource @emotion/react */
import React, { MouseEvent } from 'react';
import colors from '../../design/colors';
import { ButtonHTMLAttributes } from 'react';
import { Icon } from './Icon';

export function RoundButton({ color = 'confirm', label, size = 'large', onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      css={{
        cursor: 'pointer',
        borderRadius: '2.25rem',
        fontWeight: '600',
        width: 'auto',
        ...COLOR_VARIANTS[color],
        ...SIZE_VARIANT[size],
      }}
    >
      {label}
    </button>
  );
}

const COLOR_VARIANTS = {
  confirm: {
    border: '1px solid transparent',
    backgroundColor: colors.confirm,
    '&:hover': {
      filter: 'brightness(0.9)',
    },
  },
  black: {
    border: '1px solid transparent',
    backgroundColor: colors.black,
    color: colors.white,
    '&:hover': {
      filter: 'brightness(0.9)',
    },
  },
  white: {
    border: `1px solid ${colors.confirm}`,
    backgroundColor: colors.white,
    '&:hover': {
      filter: 'brightness(0.9)',
    },
  },
  delete: {
    border: `1px solid ${colors.warn33}`,
    color: colors.white,
    backgroundColor: colors.warn,
    '&:hover': {
      filter: 'brightness(0.9)',
    },
  },
};

const SIZE_VARIANT = {
  small: {
    height: '2rem',
    padding: '0 1rem 0 1rem',
    fontSize: '0.9rem',
  },
  large: {
    height: '3rem',
    padding: '0 1.5rem 0 1.5rem',
    fontSize: '1.1rem',
  },
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'confirm' | 'black' | 'white' | 'delete';
  size?: 'small' | 'large';
  label: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
