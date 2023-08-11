/** @jsxImportSource @emotion/react */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../../design/colors';
import { bidPriceParse } from '../../../util/bidPriceParse';
import { ConfirmButton } from '../../common/ConfirmButton';
import { Input } from '../../common/Input';

import { Spacing } from '../../common/Spacing';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme: 'dark' | 'light';
  askingPrice: string;
  onBid: (bidPrice: number) => void;
}
export function BiddingForm({ theme = 'light', askingPrice, onBid }: Props) {
  const [bidPrice, setBidPrice] = useState<string>('');

  return (
    <div
      css={{
        // border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        ...THEME_VARIANT[theme],
      }}
    >
      <div css={{ display: 'flex', alignItems: 'center' }}>
        <ConfirmButton
          btnType="progress"
          label={bidPriceParse(askingPrice) + '원 즉시입찰'}
          onClick={() => onBid(Number(askingPrice))}
        />
      </div>
      <Spacing rem="0.5" />
      <div css={{ display: 'flex' }}>
        <Input
          theme={theme}
          inputType="text"
          placeholder={'입찰가'}
          value={bidPrice}
          onChange={e => {
            const check = /^[0-9]+$/;
            if (check.test(bidPrice)) setBidPrice(e.target.value);
            else alert('숫자만 입력할 수 있어요');
          }}
          onKeyUp={e => {
            if (e.key === 'enter') alert('안전을 위해 엔터로 입찰할 수 없어요');
          }}
        />
        <Spacing rem="1" dir="h" />
        <ConfirmButton
          btnType="confirm"
          label="입찰"
          onClick={() => {
            if (bidPrice.trim().length === 0) {
              alert('입찰가를 입력해야 해요');
              return;
            }
            if (Number(bidPrice) >= Number(askingPrice)) {
              alert('입찰가는 현재 가격보다 높아야 해요');
              return;
            }
            onBid(Number(bidPrice));
            setBidPrice('');
          }}
        />
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
