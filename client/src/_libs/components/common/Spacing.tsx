/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, memo } from 'react';

export const Spacing = memo(function Spacing({ rem = '1', dir = 'v' }: Props) {
  return (
    <div
      css={{
        width: dir === 'h' ? `${rem}rem` : undefined,
        height: dir === 'v' ? `${rem}rem` : undefined,
      }}
    />
  );
});

interface Props extends HTMLAttributes<HTMLDivElement> {
  rem: '0.25' | '0.5' | '1' | '1.5' | '2' | '3' | '4' | '5';
  dir?: 'h' | 'v';
}
