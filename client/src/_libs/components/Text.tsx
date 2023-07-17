/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../design/colors';

interface Props {
  weight?: 'normal' | 'bold';
  content: string;
}

export function Text({
  weight = 'normal',
  content = '안녕 나는 P 태그야',
}: Props) {
  return (
    <p
      css={{
        ...FONT_TYPE[weight],
      }}
    >
      {content}
    </p>
  );
}

const FONT_TYPE = {
  normal: {
    fontWeight: '400',
  },
  bold: {
    fontWeight: '700',
  },
};
