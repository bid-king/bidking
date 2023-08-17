/** @jsxImportSource @emotion/react */
import React from 'react';
import { Image } from '../_libs/components/common/Image';

export function NotFound404() {
  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '91vh',
      }}
    >
      <img
        css={{
          maxWidth: '100%',
          maxHeight: '30rem',
        }}
        src="/image/NotFound404.png"
        alt="404"
      />
    </div>
  );
}
