/** @jsxImportSource @emotion/react */
import React, { ChangeEvent } from 'react';
import colors from '../../design/colors';

interface Props {
  theme?: 'light' | 'dark';
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextArea({ placeholder = 'placeholder를 입력하세요', theme = 'light', onChange }: Props) {
  return (
    <textarea
      onChange={onChange}
      placeholder={placeholder}
      css={{
        fontFamily: 'Pretendard',
        fontSize: '1rem',
        lineHeight: '1.6',
        width: '100%',
        height: '12rem',
        padding: '1rem',
        fontWeight: '400',
        outline: 'none',
        borderRadius: '1rem',
        resize: 'none',
        ...THEME_VARIENT[theme],
      }}
    />
  );
}

const THEME_VARIENT = {
  light: {
    backgroundColor: colors.backgroundLight2,
    border: `1px solid ${colors.grey}`,
    color: colors.black,
    '::placeholder': { color: colors.grey, fontWeight: 600 },
  },
  dark: {
    backgroundColor: colors.backgroundDark3,
    border: `1px solid ${colors.backgroundDark3}`,
    color: colors.white,
    '::placeholder': { color: colors.lightgrey, fontWeight: 600 },
  },
};
