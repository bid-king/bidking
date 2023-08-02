/** @jsxImportSource @emotion/react */
import React, { InputHTMLAttributes, ChangeEvent } from 'react';
import colors from '../../design/colors';
import { HTMLAttributes } from 'react';

export function Checkbox({ theme, id, value, onChange }: Props) {
  return (
    <input
      id={id}
      type="checkbox"
      value={value}
      onChange={onChange}
      css={{
        appearance: 'none',
        cursor: 'pointer',
        width: '1.25rem',
        height: '1.25rem',
        border: `1px solid ${colors.confirm}`,
        borderRadius: '0.35rem',
        '&:checked': {
          backgroundImage: 'url("/image/check.svg")',
          backgroundPosition: 'center center',
          borderColor: 'transparent',
          backgroundColor: colors.confirm,
        },
      }}
    />
  );
}

const COLOR_VARIANT = {
  light: colors.black,
  dark: colors.white,
};

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  theme: 'light' | 'dark';
  id: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
