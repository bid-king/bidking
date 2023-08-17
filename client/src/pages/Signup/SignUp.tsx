/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { SignUpBox } from './SignUpBox';
import colors from '../../_libs/design/colors';

export function SignUp() {
  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '94vh',
        backgroundColor: colors.backgroundLight,
      }}
    >
      <SignUpBox />
    </div>
  );
}
