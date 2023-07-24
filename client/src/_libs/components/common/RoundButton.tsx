/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../../design/colors';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'confirm' | 'white';
  size?: 'small' | 'medium';
  label: string;
  activated?: 0 | 1;
}

export function RoundButton({ variant = 'confirm', label = '로그인', activated = 1 }: Props) {
  return (
    <button
      type="button"
      css={{
        cursor: 'pointer',
        borderRadius: '2.25rem',
        transition: 'filter 0.3s',
        height: '3rem',
        padding: '0 1.5rem 0 1.5rem',
        fontWeight: '600',
        fontSize: '1.1rem',
        ...TYPE_VARIANTS[variant],
        ...IS_ACTIVATED[activated],
      }}
    >
      {label}
    </button>
  );
}

const TYPE_VARIANTS = {
  confirm: {
    border: `1px solid ${colors.confirm}`,
    backgroundColor: colors.confirm,
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
};

const IS_ACTIVATED = {
  0: {},
  1: {},
};
