/** @jsxImportSource @emotion/react */
import React from 'react';

export function Image({ src = '/public/image/logo/logo_light.png', alt = 'bidking' }: Props) {
  return (
    <img
      css={{
        maxWidth: '100%',
        maxHeight: '15rem',
      }}
      src={src}
      alt={alt}
    />
  );
}

interface Props {
  src: string;
  alt: string;
}
