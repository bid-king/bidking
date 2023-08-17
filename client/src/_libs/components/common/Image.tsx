/** @jsxImportSource @emotion/react */
import React, { SyntheticEvent } from 'react';

export function Image({ src, alt = 'bidking', onError }: Props) {
  return (
    <img
      css={{
        width: '100%',
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
