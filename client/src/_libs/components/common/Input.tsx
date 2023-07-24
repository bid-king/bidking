/** @jsxImportSource @emotion/react */
import React, { ChangeEvent } from 'react';
import colors from '../../design/colors';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLInputElement> {
  id?: string;
  inputType?: string;
  theme?: 'light' | 'dark';
  shape?: 'square' | 'round';
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export function Input({
  id,
  inputType = 'text',
  placeholder = 'placeholder를 입력하세요',
  theme = 'light',
  shape = 'square',
  value,
  onChange,
  onBlur,
}: Props) {
  return (
    <input
      id={id}
      type={inputType}
      placeholder={placeholder}
      value={value}
      css={{
        width: '100%',
        height: '2.5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        fontWeight: 700,
        outline: 'none',
        ...THEME_VARIENT[theme],
        ...SHAPE_VARIENT[shape],
      }}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

const THEME_VARIENT = {
  light: {
    backgroundColor: colors.backgroundLight2,
    border: `1px solid ${colors.grey}`,
    color: colors.black,
  },
  dark: {
    backgroundColor: colors.backgroundDark3,
    border: `1px solid ${colors.backgroundDark3}`,
    color: colors.white,
    '::placeholder': { color: colors.lightgrey },
  },
};

const SHAPE_VARIENT = {
  round: {
    borderRadius: '2rem',
  },
  square: {
    borderRadius: '8px',
  },
};
