/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, HTMLAttributes, ReactNode } from 'react';
import colors from '../../design/colors';

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  id?: string;
  theme?: 'light' | 'dark';
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
}

interface OptionProps {
  value: string | number;
  children: string;
}

export function SelectOption({ value, children }: OptionProps) {
  return (
    <option
      value={value}
      css={{
        backgroundColor: colors.white,
        fontWeight: 600,
        color: colors.black,
      }}
    >
      {children}
    </option>
  );
}

export function Select({ id, theme = 'light', value, onChange, children }: SelectProps) {
  return (
    <select
      id={id}
      value={value}
      css={{
        appearance: 'none',
        width: '100%',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        fontWeight: 600,
        outline: 'none',
        ...THEME_VARIENT[theme],
        borderRadius: '1rem',
        height: '3rem',
        fontSize: '1.1rem',
      }}
      onChange={onChange}
    >
      {children}
    </select>
  );
}

const THEME_VARIENT = {
  light: {
    backgroundColor: colors.backgroundLight3,
    border: '1px solid transparent',
    color: colors.black,
  },
  dark: {
    backgroundColor: colors.backgroundDark2,
    border: '1px solid transparent',
    color: colors.white,
    '::placeholder': { color: colors.whitegrey },
  },
};
