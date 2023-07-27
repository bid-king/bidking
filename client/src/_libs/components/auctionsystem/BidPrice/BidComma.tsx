/** @jsxImportSource @emotion/react */
import React from 'react';

export function BidComma() {
  return (
    <div
      css={{
        // border: '1px solid black',
        width: '0.9rem',
        height: '3rem',
        textAlign: 'center',
        fontWeight: '600',
        fontFeatureSettings: '"tnum"',
        fontSize: '3rem',
        overflow: 'hidden',
        position: 'relative',
        lineHeight: '2.75rem',
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
