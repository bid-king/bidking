/** @jsxImportSource @emotion/react */
import React, { LabelHTMLAttributes } from 'react';
import colors from '../../design/colors';

export function Label({ theme, htmlFor, value, display = 'inline' }: Props) {
  return (
    <label
      htmlFor={htmlFor}
      css={{
        display: display,
        ...COLOR_VARIANT[theme],
        fontWeight: '600',
        fontSize: '0.9rem',
      }}
    >
      {value}
    </label>
  );
}

const COLOR_VARIANT = {
  light: { color: colors.black },
  dark: { color: colors.white },
};

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  theme: 'light' | 'dark';
  htmlFor: string;
  value: string;
  display?: 'inline' | 'inline-block' | 'block';
}
