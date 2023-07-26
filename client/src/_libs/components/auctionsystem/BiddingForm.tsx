/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../design/colors';
import { bidPriceParse } from '../../util/bidPriceParse';
import { ConfirmButton } from '../common/ConfirmButton';
import { Input } from '../common/Input';
import { RoundButton } from '../common/RoundButton';
import { Spacing } from '../common/Spacing';
import { Text } from '../common/Text';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme: 'dark' | 'light';
  askingPrice: string;
}
export function BiddingForm({ theme = 'light', askingPrice = '1100000' }: Props) {
  const [bidPrice, setBidPrice] = useState<string>('0');
  useEffect(() => {}, []);
  return (
    <div
      css={{
        // border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        ...THEME_VARIANT[theme],
      }}
    >
      <div css={{ display: 'flex' }}>
        <Input
          inputType="text"
          placeholder={bidPriceParse(askingPrice)}
          onChange={e => setBidPrice(e.target.value)}
          theme={theme}
        />
        <Spacing rem="1" dir="h" />
        <ConfirmButton btnType="warn" label="입찰" onClick={() => alert('입찰함')} />
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
