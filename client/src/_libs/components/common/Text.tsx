/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes } from 'react';
import colors from '../../design/colors';

interface Props {
  type?: 'h1' | 'h2' | 'h3' | 'normal' | 'bold' | 'p';
  content: string;
}

export function Text({ type = 'normal', content = '' }: Props) {
  if (type === 'h1') return <h1 css={{ ...FONT_TYPE[type] }}>{content}</h1>;
  if (type === 'h2') return <h2 css={{ ...FONT_TYPE[type] }}>{content}</h2>;
  if (type === 'h3') return <h3 css={{ ...FONT_TYPE[type] }}>{content}</h3>;
  if (type === 'p') return <p css={{ ...FONT_TYPE[type] }}>{content}</p>;
  else return <span css={{ ...FONT_TYPE[type] }}>{content}</span>;
}

const FONT_TYPE = {
  normal: {
    fontWeight: '400',
  },
  bold: {
    fontWeight: '700',
  },
  h1: {
    fontWeight: '600',
    fontSize: '1.5rem',
  },
  h2: {
    fontWeight: '700',
    fontSize: '1.25rem',
  },
  h3: {
    fontWeight: '700',
    fontSize: '1rem',
  },
  p: {
    fontWeight: '400',
    fontSize: '0.9rem',
  },
};

const THEME_VARIANT = {
  light: {
    color: colors.black,
  },
  dark: {
    color: colors.white,
  },
};
