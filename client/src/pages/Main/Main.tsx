/** @jsxImportSource @emotion/react */
import React from 'react';
import { SellerStream } from '../../_libs/components/meeting/SellerStream';
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
