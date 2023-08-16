/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { bid } from '../../../../api/live';
import { useAppSelector } from '../../../../store/hooks';
import colors from '../../../design/colors';
import { tryBid, bidPriceParse, validateBidPrice } from '../../../util/bidPriceParse';
import { ConfirmButton } from '../../common/ConfirmButton';
import { Input } from '../../common/Input';

import { Spacing } from '../../common/Spacing';
import { Text } from '../../common/Text';

export function BiddingForm({ theme = 'light', auctionRoomId, itemId, currPrice, askingPrice, disable }: Props) {
  const [bidPrice, setBidPrice] = useState<string>('');
  const [alert, setAlert] = useState<string>('');
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
          disable={disable}
          btnType="progress"
          label={bidPriceParse(String(askingPrice)) + '원 즉시입찰'}
          onClick={() => bid(auctionRoomId, itemId, askingPrice, accessToken)}
        />
      </div>
      <div
        css={{
          ...THEME_VARIANT[theme],
          height: '0.75rem',
          borderRadius: '1rem',
          padding: '0 0.5rem 0 0.5rem',
          fontSize: '0.66rem',
        }}
      >
        <Text content={alert} />
      </div>
      <div css={{ display: 'flex' }}>
        <Input
          theme={theme}
          inputType="text"
          placeholder={'입찰가'}
          onChange={e => validateBidPrice(bidPrice, askingPrice) === 'OK' && setBidPrice(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') setAlert('엔터키로는 입찰할 수 없어요');
            if (validateBidPrice(bidPrice, askingPrice) === 'OK') setAlert('');
            else setAlert(validateBidPrice(bidPrice, askingPrice));
          }}
        />
        <Spacing rem="1" dir="h" />
        <ConfirmButton
          disable={disable}
          btnType="confirm"
          label="입찰"
          onClick={() => {
            if (tryBid(setBidPrice, currPrice, askingPrice, Number(bidPrice), setAlert))
              bid(auctionRoomId, itemId, Number(bidPrice), accessToken);
            else return;
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
  askingPrice: number;
  auctionRoomId: number;
  itemId: number;
  disable: boolean;
}
