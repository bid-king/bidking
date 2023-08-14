/** @jsxImportSource @emotion/react */
import React, { MutableRefObject, useEffect, useMemo, useState } from 'react';
import { HTMLAttributes } from 'react';
import { Socket } from 'socket.io-client';
import colors from '../../../design/colors';
import { useBidPrice } from '../../../hooks/useBidPrice';
import { bidPriceParse } from '../../../util/bidPriceParse';
import { BidComma } from './BidComma';
import { BidNumber } from './BidNumber';
import { BidWon } from './BidWon';

interface Props extends HTMLAttributes<HTMLDivElement> {
  align: 'left' | 'right' | 'center';
  theme: 'dark' | 'light';
  priceArr: string[];
}
//price는 시험용 변수로, 실적용 시 삭제하고 useBidPrice()를 활성화해야합니다.
export function BidPrice({ align = 'center', theme = 'light', priceArr }: Props) {
  //여기까지를 주석 처리해야합니다.
  return (
    <div css={{ width: '100%', height: '2rem', position: 'relative' }}>
      <div
        css={{
          // border: '1px solid black',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          width: `${
            2 +
            //원
            0.9 * priceArr.reduce((acc, cur) => (cur === '1' ? acc + '1' : acc), '').length +
            //1
            1.15 * priceArr.reduce((acc, cur) => (cur !== '1' && cur !== ',' ? acc + '1' : acc), '').length +
            //1외의 모든 수
            0.6 * priceArr.reduce((acc, cur) => (cur === ',' ? acc + '1' : acc), '').length
            //comma
          }rem`,
          transition: 'width 0.2s ease-out',
          transitionDelay: '0.15s',
          ...THEME_VARIANT[theme],
        }}
      >
        {/* <div css={{ color: colors.warn, width: '0.5rem', marginRight: '1rem' }}>▲</div> */}
        {priceArr.map((item, idx) => {
          if (item === ',') return <BidComma key={idx} />;
          else return <BidNumber key={idx} n={Number(item)} o={priceArr.length - idx} />;
        })}
        <BidWon />
      </div>
    </div>
  );
}
const THEME_VARIANT = {
  light: {
    color: colors.black,
  },
  dark: {
    color: colors.white,
    backgroundColor: colors.backgroundDark2,
  },
};
