/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../../design/colors';

interface Props {
  inputType?: 'text' | 'email';
  theme?: 'light' | 'dark';
  shape?: 'square' | 'round';
  placeholder: string;
}

export function Input({
  inputType = 'text',
  placeholder = 'placeholder를 입력하세요',
  theme = 'light',
  shape = 'square',
}: Props) {
  return (
    <input
      type={inputType}
      placeholder={placeholder}
      css={{
        width: '100%',
        height: '2rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        fontWeight: 700,
        outline: 'none',
        ...THEME_VARIENT[theme],
        ...SHAPE_VARIENT[shape],
      }}
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
