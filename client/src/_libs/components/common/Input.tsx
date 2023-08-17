/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, KeyboardEvent, forwardRef } from 'react';
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
  autoComplete?: 'off' | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      inputType = 'text',
      placeholder = 'placeholder를 입력하세요',
      size = 'large',
      theme = 'light',
      shape = 'square',
      value,
      autoComplete = undefined,
      onChange,
      onBlur,
      onKeyDown,
      ...rest
    },
    ref
  ) => {
    return (
      <input
        {...rest}
        ref={ref}
        id={id}
        type={inputType}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        css={{
          width: '100%',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          fontWeight: 600,
          outline: 'none',
          ...THEME_VARIENT[theme],
          ...SHAPE_VARIENT[shape],
          ...SIZE_VARIENT[size],
        }}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    );
  }
);

const THEME_VARIENT = {
  light: {
    backgroundColor: colors.backgroundLight3,
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
    borderRadius: '3rem',
  },
  square: {
    borderRadius: '0.85rem',
  },
};

const SIZE_VARIENT = {
  small: {
    height: '1.75rem',
    fontSize: '0.85rem',
  },
  large: {
    height: '2.25rem',
    fontSize: '0.95rem',
  },
};

Input.displayName = 'Input';
