/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes } from 'react';
import colors from '../design/colors';

interface Props {
  type?: 'h1' | 'h2' | 'h3' | 'normal' | 'bold';
  color?: 'white' | 'confirm' | 'warn' | 'progress' | 'ok' | 'black';
  content: string;
}

export function Text({ type = 'normal', color = 'black', content = '예시 텍스트' }: Props) {
  if (type === 'h1') return <h1 css={{ ...FONT_TYPE[type], color: colors[color] }}>{content}</h1>;
  if (type === 'h2') return <h2 css={{ ...FONT_TYPE[type], color: colors[color] }}>{content}</h2>;
  if (type === 'h3') return <h3 css={{ ...FONT_TYPE[type], color: colors[color] }}>{content}</h3>;
  else
    return (
      <span
        css={{
          ...FONT_TYPE[type],
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
