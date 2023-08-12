/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  n: number;
  o: number;
}
export function BidNumber({ n, o }: Props) {
  const [prev, setPrev] = useState<number>(-1);
  useEffect(() => {
    setPrev(n);
  }, [n]);
  return (
    <div
      css={{
        // border: '1px solid black',
        width: n === 1 ? '0.9rem' : '1.15rem',
        textAlign: 'center',
        fontWeight: '600',
        fontFeatureSettings: '"tnum"',
        fontSize: '2rem',
        overflow: 'hidden',
        position: 'relative',
        lineHeight: '2rem',
        background: 'transparent',
        transition: 'width 0.2s',
        transitionDelay: `${0.015 * o}s`,
      }}
    >
      <div
        css={{
          background: 'transparent',
          position: 'absolute',
          top: 0,
          left: n === 1 ? '-0.3rem' : '-0.1rem',
          transform: `translateY(-${2 * n}rem)`,
          transition: 'transform 0.15s ease-in-out, left 0.15s',
          transitionDelay: `${0.015 * o}s`,
        }}
      >
        <ul css={{}}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, idx) => (
            <li key={idx} css={{ display: 'flex', alignItems: 'center' }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
