/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { SignUpBox } from './SignUpBox';

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
