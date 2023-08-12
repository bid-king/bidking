/** @jsxImportSource @emotion/react */
import React from 'react';

export function BidComma() {
  return (
    <div
      css={{
        // border: '1px solid black',
        width: '0.6rem',
        height: '2rem',
        textAlign: 'center',
        fontWeight: '600',
        fontFeatureSettings: '"tnum"',
        fontSize: '2rem',
        overflow: 'hidden',
        position: 'relative',
        lineHeight: '1.75rem',
      }}
    >
      <div css={{ height: '10em', position: 'absolute', left: '-0.05rem' }}>
        <ul>
          <li>,</li>
        </ul>
      </div>
    </div>
  );
}
