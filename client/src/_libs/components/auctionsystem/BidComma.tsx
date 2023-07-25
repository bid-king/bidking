/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../../design/colors';

export function BidComma() {
  return (
    <div
      css={{
        // border: '1px solid black',
        width: '1.15rem',
        height: '3rem',
        textAlign: 'center',
        fontWeight: '700',
        fontFeatureSettings: '"tnum"',
        letterSpacing: '-0.1rem',
        fontSize: '3rem',
        overflow: 'hidden',
        position: 'relative',
        lineHeight: '3rem',
      }}
    >
      <div css={{ height: '10em', position: 'absolute' }}>
        <ul>
          <li>,</li>
        </ul>
      </div>
    </div>
  );
}
