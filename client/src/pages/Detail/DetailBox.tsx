/** @jsxImportSource @emotion/react */
import React, { JSXElementConstructor } from 'react';
import { HTMLAttributes } from 'react';
import { Text } from '../../_libs/components/common/Text';
import colors from '../../_libs/design/colors';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme: 'light' | 'dark';
  title: string;
}

export function DetailBox({ title = '경매제목', theme = 'light' }: Props) {
  return (
    <div
      css={{
        width: '50rem',
        borderRadius: '0.5rem',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        ...THEME_VARIANTS[theme],
      }}
    >
      <Text type="h3" content={title}></Text>
    </div>
  );
}

const THEME_VARIANTS = {
  light: {
    backgroundColor: colors.backgroundLight2,
  },
  dark: {
    backgroundColor: colors.backgroundDark2,
    color: colors.white,
  },
};
