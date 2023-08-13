/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { bid } from '../../../../api/live';
import { useAppSelector } from '../../../../store/hooks';
import colors from '../../../design/colors';
import { tryBid, bidPriceParse, validateBidPrice } from '../../../util/bidPriceParse';
import { ConfirmButton } from '../../common/ConfirmButton';
import { Input } from '../../common/Input';

import { Spacing } from '../../common/Spacing';

export function BiddingForm({ theme = 'light', auctionRoomId, itemId, currPrice, askingPrice, disable }: Props) {
  const [bidPrice, setBidPrice] = useState<string>('');
  const { accessToken } = useAppSelector(state => state.user);

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
          onClick={async () => {
            await tryBid(setBidPrice, currPrice, askingPrice, askingPrice);
            bid(auctionRoomId, itemId, askingPrice, accessToken);
          }}
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
          onClick={async () => {
            await tryBid(setBidPrice, currPrice, askingPrice, bidPrice);
            bid(auctionRoomId, itemId, bidPrice, accessToken);
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

interface Props {
  theme: 'dark' | 'light';
  currPrice: number;
  auctionRoomId: number;
  itemId: number;
  askingPrice: string;
  disable: boolean;
}
