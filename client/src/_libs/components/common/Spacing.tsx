/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  rem: '0.5' | '1' | '2' | '3' | '4' | '5';
  dir?: 'h' | 'v';
}

export function Spacing({ rem = '1', dir = 'v' }: Props) {
  return (
    <div
      css={{
        width: dir === 'h' ? `${rem}rem` : undefined,
        height: dir === 'v' ? `${rem}rem` : undefined,
      }}
    />
  );
}
