/** @jsxImportSource @emotion/react */
import React, { SyntheticEvent } from 'react';

export function Image({ src = '/public/image/logo/logo_light.png', alt = 'bidking', onError }: Props) {
  return (
    <img
      css={{
        maxWidth: '100%',
        maxHeight: '15rem',
      }}
      src={src}
      alt={alt}
      onError={onError}
    />
  );
}

interface Props {
  src: string;
  alt: string;
  onError?: React.EventHandler<React.SyntheticEvent<HTMLImageElement, Event>>;
}
