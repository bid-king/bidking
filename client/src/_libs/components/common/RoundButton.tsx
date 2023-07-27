/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../../design/colors';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'confirm' | 'white';
  size?: 'small' | 'large';
  label: string;
  activated?: 0 | 1;
}

export function RoundButton({ variant = 'confirm', label = '로그인', size = 'large' }: Props) {
  return (
    <button
      type="button"
      css={{
        cursor: 'pointer',
        borderRadius: '2.25rem',
        transition: 'filter 0.3s',
        fontWeight: '600',

        ...TYPE_VARIANTS[variant],
        ...SIZE_VARIANT[size],
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
