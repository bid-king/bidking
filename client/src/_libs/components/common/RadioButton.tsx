/** @jsxImportSource @emotion/react */
import React, { InputHTMLAttributes, ChangeEvent } from 'react';
import colors from '../../design/colors';
import { HTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  checkedValue: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function RadioButton({ name, onChange, value, checkedValue }: Props) {
  return (
    <input
      type="radio"
      name={name}
      checked={checkedValue === value}
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
