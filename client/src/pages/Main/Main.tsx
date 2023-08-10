/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../../_libs/design/colors';
import { MainBox } from './MainBox';

export function Main() {
  return (
    <div
      css={{
        backgroundColor: colors.backgroundLight,
        minHeight: '100vh',
      }}
    >
      <MainBox />
    </div>
  );
}
