/** @jsxImportSource @emotion/react */
import React, { InputHTMLAttributes, ChangeEvent } from 'react';
import colors from '../../design/colors';
import { HTMLAttributes } from 'react';

export function Checkbox({ theme, id, value, onChange, checked }: Props) {
  return (
    <input
      id={id}
      type="checkbox"
      value={value}
      onChange={onChange}
      checked={checked}
      css={{
        appearance: 'none',
        cursor: 'pointer',
        width: '1.15rem',
        height: '1.15rem',
        border: `1px solid ${colors.confirm}`,
        borderRadius: '0.3rem',
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
  checked?: boolean;
}
