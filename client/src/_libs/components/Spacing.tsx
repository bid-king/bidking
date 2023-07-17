/** @jsxImportSource @emotion/react */
import React from 'react';

interface Props {
  spacing: 1 | 2 | 3 | 4 | 5;
}

export function Spacing({ spacing = 1 }: Props) {
  return (
    <div
      css={{
        marginBottom: spacing + 'rem',
      }}
    />
  );
}
