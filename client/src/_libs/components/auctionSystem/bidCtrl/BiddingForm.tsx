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

export function BiddingForm({
  theme = 'light',
  auctionRoomId,
  itemId,
  currPrice,
  askingPrice,
  disable,
  setAlert,
}: Props) {
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
          disable={disable}
          btnType="progress"
          label={
            String(askingPrice).length < 13
              ? bidPriceParse(String(askingPrice)) + '원 즉시입찰'
              : '1조 원 미만으로 입찰할 수 있어요'
          }
          onClick={() => (String(askingPrice).length < 13 ? bid(auctionRoomId, itemId, askingPrice, accessToken) : {})}
        />
      </div>
      <div
        css={{
          ...THEME_VARIANT[theme],
          height: '0.75rem',
          borderRadius: '1rem',
          padding: '0 0.75rem 0 0.75rem',
          fontSize: '0.66rem',
        }}
      ></div>
      <div css={{ display: 'flex' }}>
        <Input
          autoComplete="off"
          theme={theme}
          inputType="text"
          placeholder={'입찰가'}
          value={bidPrice}
          onChange={e => {
            if (validateBidPrice(bidPrice) || bidPrice === '') setBidPrice(e.target.value);
            else {
              console.log('입찰가는 1조 미만의 숫자여야 해요.');
              setBidPrice('');
            }
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') console.log('엔터키로는 입찰할 수 없어요');
            setBidPrice('');
          }}
        />
        <Spacing rem="1" dir="h" />
        <ConfirmButton
          disable={disable}
          btnType="confirm"
          label="입찰"
          onClick={() => {
            if (currPrice < Number(bidPrice) && validateBidPrice(bidPrice)) {
              bid(auctionRoomId, itemId, Number(bidPrice), accessToken);
            } else {
              console.log('입찰가는 현재 최고 입찰가보다 높아야 하지만, 1조 원 미만으로 쓸 수 있어요.');
            }
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

interface Props {
  theme: 'dark' | 'light';
  currPrice: number;
  askingPrice: number;
  auctionRoomId: number;
  itemId: number;
  disable: boolean;
  setAlert: (arg: string) => void;
}
