/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import colors from '../../../design/colors';
import { Bid, bidPriceParse, validateBidPrice } from '../../../util/bidPriceParse';
import { ConfirmButton } from '../../common/ConfirmButton';
import { Input } from '../../common/Input';

import { Spacing } from '../../common/Spacing';

export function BiddingForm({ theme = 'light', askingPrice, onBid, disable }: Props) {
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
          onClick={() => onBid(askingPrice)}
        />
      </div>
      <Spacing rem="0.5" />
      <div css={{ display: 'flex' }}>
        <Input
          theme={theme}
          inputType="text"
          placeholder={'입찰가'}
          value={bidPrice}
          onChange={e => validateBidPrice(e.target.value, setBidPrice)}
          onKeyDown={e => e.key === 'Enter' && alert('엔터키로는 입찰할 수 없어요')}
        />
        <Spacing rem="1" dir="h" />
        <ConfirmButton
          disable={disable}
          btnType="confirm"
          label="입찰"
          onClick={() => Bid(setBidPrice, bidPrice, askingPrice, onBid)}
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

interface Props {
  theme: 'dark' | 'light';
  askingPrice: string;
  onBid: (bidPrice: string) => void;
  disable: boolean;
}
