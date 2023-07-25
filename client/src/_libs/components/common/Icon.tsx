/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../../design/colors';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme: 'light' | 'dark';
  title: string;
}

export function Icon({ title = '경매제목', theme = 'light' }: Props) {
  return <></>;
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
