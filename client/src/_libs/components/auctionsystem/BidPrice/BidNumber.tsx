/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  n: number;
  o: number;
}
export function BidNumber({ n, o }: Props) {
  return (
    <div
      css={{
        // border: '1px solid black',
        width: n === 1 ? '1.4rem' : '1.8rem',
        height: '3rem',
        textAlign: 'center',
        fontWeight: '600',
        fontFeatureSettings: '"tnum"',
        fontSize: '3rem',
        overflow: 'hidden',
        position: 'relative',
        lineHeight: '3rem',
        background: 'transparent',
        transition: 'width 0.2s ease-out',
      }}
    >
      <div
        css={{
          height: '10em',
          background: 'transparent',
          position: 'absolute',
          top: 0,
          left: n === 1 ? '-0.35rem' : '-0.125rem',
          transform: `translateY(-${n}em)`,
          transition: 'transform 0.2s ease-in-out, left 0.2s',
          transitionDelay: `${0.02 * o}s`,
        }}
      >
        <ul>
          <li>0</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
        </ul>
      </div>
    </div>
  );
}
