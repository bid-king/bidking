/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { SignUpBox } from '../_libs/components/common/SignUpBox';

export function SignUp() {
  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '91.5vh',
      }}
    >
      <SignUpBox />
    </div>
  );
}
