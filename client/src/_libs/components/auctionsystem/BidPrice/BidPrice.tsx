/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../../design/colors';
import { useBidPrice } from '../../../hooks/useBidPrice';
import { bidPriceParse } from '../../../util/bidPriceParse';
import { BidComma } from './BidComma';
import { BidNumber } from './BidNumber';
import { BidWon } from './BidWon';

interface Props extends HTMLAttributes<HTMLDivElement> {
  align: 'left' | 'right' | 'center';
  theme: 'dark' | 'light';
}
//price는 시험용 변수로, 실적용 시 삭제하고 useBidPrice()를 활성화해야합니다.
export function BidPrice({ align = 'center', theme = 'light' }: Props) {
  // const [priceArr, prev, curr, err] = useBidPrice();
  const [priceArr, setPriceArr] = useState<string[]>(['0']);
  useEffect(() => {
    setPriceArr(bidPriceParse('148300').split('')); //중간에 테스트할 숫자를 입력하고 테스트하면됩니다
  }, [priceArr]);
  //여기까지를 주석 처리해야합니다.
  return (
    <div css={{ width: '100%', height: '3.25rem', position: 'relative' }}>
      <div
        css={{
          // border: '1px solid black',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          width: `${
            2.5 +
            //원
            1.4 * priceArr.reduce((acc, cur) => (cur === '1' ? acc + '1' : acc), '').length +
            //1
            1.8 * priceArr.reduce((acc, cur) => (cur !== '1' && cur !== ',' ? acc + '1' : acc), '').length +
            //1외의 모든 수
            0.9 * priceArr.reduce((acc, cur) => (cur === ',' ? acc + '1' : acc), '').length
            //comma
          }rem`,
          transition: 'width 0.25s ease-out',
          transitionDelay: '0.1s',
          ...THEME_VARIANT[theme],
        }}
      >
        {/* <div css={{ color: colors.warn, width: '0.5rem', marginRight: '1rem' }}>▲</div> */}
        {priceArr.map((item, idx) => {
          if (item === ',') return <BidComma />;
          else return <BidNumber n={Number(item)} o={priceArr.length - idx} />;
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
