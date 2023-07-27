/** @jsxImportSource @emotion/react */
import React, { ChangeEvent } from 'react';
import colors from '../../design/colors';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLInputElement> {
  id?: string;
  inputType?: string;
  theme?: 'light' | 'dark';
  shape?: 'square' | 'round';
  size?: 'small' | 'large';
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export function Input({
  id,
  inputType = 'text',
  placeholder = 'placeholder를 입력하세요',
  size = 'large',
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

        paddingLeft: '1rem',
        paddingRight: '1rem',
        fontWeight: 600,
        letterSpacing: '0.05rem',
        outline: 'none',
        ...THEME_VARIENT[theme],
        ...SHAPE_VARIENT[shape],
        ...SIZE_VARIENT[size],
      }}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

const THEME_VARIENT = {
  light: {
    backgroundColor: colors.backgroundLight,
    border: '1px solid transparent',
    color: colors.black,
  },
  dark: {
    backgroundColor: colors.backgroundDark3,
    border: '1px solid transparent',
    color: colors.white,
    '::placeholder': { color: colors.whitegrey },
  },
};

const SHAPE_VARIENT = {
  round: {
    borderRadius: '2rem',
  },
  square: {
    borderRadius: '1rem',
  },
};

const SIZE_VARIENT = {
  small: {
    height: '2rem',
    fontSize: '0.9rem',
  },
  large: {
    height: '3rem',
    fontSize: '1.15rem',
  },
};
