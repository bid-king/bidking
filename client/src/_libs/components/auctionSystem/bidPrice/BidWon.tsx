/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';

export function BidWon() {
  return (
    <div
      css={{
        // border: '1px solid black',
        width: '2rem',
        height: '2rem',
        textAlign: 'center',
        fontWeight: '700',
        fontFeatureSettings: '"tnum"',
        fontSize: '2rem',
        overflow: 'hidden',
        position: 'relative',
        lineHeight: '1.85rem',
      }}
    >
      <div css={{ position: 'absolute', top: '0.05rem' }}>
        <ul>
          <li>원</li>
        </ul>
      </div>
    </div>
  );
}
