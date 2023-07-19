/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes } from 'react';
import colors from '../design/colors';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  type?: 'h1' | 'h2' | 'h3' | 'normal' | 'bold';
  content: string | undefined;
  color: 'white' | 'confirm' | 'warn' | 'progress' | 'ok' | 'black';
}

export function Text({ type = 'normal', content = '예시 텍스트', color = 'black' }: Props) {
  return (
    <span
      css={{
        ...FONT_TYPE[type],
        margin: 0,
        padding: 0,
        lineHeight: 1.75,
        color: colors[color],
      }}
    >
      {content}
    </span>
  );
}

const FONT_TYPE = {
  normal: {
    fontWeight: '400',
  },
  bold: {
    fontWeight: '700',
  },
  h1: {
    fontWeight: '900',
    fontSize: '2rem',
  },
  h2: {
    fontWeight: '700',
    fontSize: '1.5rem',
  },
  h3: {
    fontWeight: '700',
    fontSize: '1.25rem',
  },
};
