/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../../design/colors';
interface Props extends HTMLAttributes<HTMLDivElement> {
  n: number;
  o: number;
}
export function BidNumber({ n, o }: Props) {
  return (
    <div
      css={{
        // border: '1px solid black',
        width: '1.8rem',
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
      <div
        css={{
          height: '10em',
          position: 'absolute',
          top: 0,
          left: '-0.125rem',
          transform: `translateY(-${n}em)`,
          transition: 'transform 0.125s ease-out',
          transitionDelay: `${0.01 * o}s`,
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
