/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../../design/colors';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: 'confirm' | 'warn' | 'progress' | 'ok';
  activated?: 0 | 1;
  label?: string;
}

export function ConfirmButton({ btnType = 'confirm', activated = 1, label = '안녕 나는 확인버튼이야' }: Props) {
  return (
    <button
      css={{
        cursor: 'pointer',
        width: '100%',
        height: '2.5rem',
        border: 'none',
        outline: 'none',
        borderRadius: '0.5rem',
        fontWeight: '600',
        ...BTN_TYPES[btnType],
        ...BTN_TYPES[activated],
      }}
    >
      {label}
    </button>
  );
}

const BTN_TYPES = {
  confirm: {
    background: colors.confirm,
    color: colors.black,
    '&:hover': {
      background: colors.confirm33,
      color: colors.grey,
    },
  },
  warn: { background: colors.warn, color: colors.white },
  progress: { background: colors.progress, color: colors.white },
  ok: { background: colors.ok, color: colors.black },
  0: {},
  1: {},
};
