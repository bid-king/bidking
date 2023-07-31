/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useState } from 'react';
import colors from '../../design/colors';
import { Text } from '../common/Text';
import paymentState from '../../constants/paymentState';
import { Input } from '../common/Input';
import { Spacing } from '../common/Spacing';

export function ItemCardSeller({ theme = 'light', item }: Props) {
  const [detailDisplay, setDetailDisplay] = useState<boolean>(false);
  return (
    <div
      className="container"
      css={{
        ...THEME_VARIENT[theme],
        ...BORDER_VARIENT[item.orderState],
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        borderRadius: '1rem',
      }}
    >
      <div
        className="cardHeader"
        css={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text type="bold" content={'순번 ' + item.itemOrdering} />
        <Text type="bold" content={paymentState[item.orderState]} />
      </div>
      <Spacing rem="1" />
      <div className="cardBody-ItemName">
        <Text type="h3" content={item.itemName} />
      </div>
      <Spacing rem="1" />
      <div
        className="cardBody-orderInfo"
        css={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div
          css={{
            width: '50%',
          }}
        >
          <Text content={'낙찰자 '} />
          <Text type="bold" content={item.successMemberNickname} />
        </div>
        <div>
          <Text content={'낙찰가 '} />
          <Text type="bold" content={item.successPrice} />
        </div>
      </div>
      <div>
        <Text type="bold" content={item.successTime + ' 낙찰'} />
      </div>
      <Spacing rem="1" />
      <div>
        <Text content={'배송정보'} />
        {item.orderState === 'PAYMENT_OK' && item.deliveryAddress.length > 0 ? (
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Text type="bold" content={item.deliveryAddress} />
            <Text type="bold" content={item.deliveryMsg} />
          </div>
        ) : (
          <Text content={'낙찰자가 배송지를 입력하지 않았어요'} />
        )}
      </div>
      <div
        css={{
          display: 'flex',
        }}
      >
        <Input theme={theme} inputType="text" placeholder={item.invoice.courier} />
        <Input theme={theme} inputType="text" placeholder={item.invoice.invoiceNumber} />
      </div>
      <Spacing rem="1" />
      {/*이 아래는 접으면 접히는 부분*/}
      <div
        css={{
          display: `${detailDisplay ? 'block' : 'none'}`,
        }}
      >
        <div>
          <img
            src={item.itemImageUrl}
            alt={item.itemDescription}
            css={{
              borderRadius: '1rem',
              width: '100%',
              maxHeight: '15rem',
            }}
          />
          <Spacing rem="1" />
        </div>
        <div>
          <Text type="normal" content={item.itemDescription} />
        </div>
        <Spacing rem="2" />
      </div>

      {/* 여기까지 접는 부분 */}
      <div css={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => setDetailDisplay(!detailDisplay)}>
        {detailDisplay ? '접기' : '펼치기'}
      </div>
    </div>
  );
}

const THEME_VARIENT = {
  light: {
    backgroundColor: colors.backgroundLight2,
    border: `1px solid ${colors.grey}`,
    color: colors.black,
  },
  dark: {
    backgroundColor: colors.backgroundDark3,
    border: `1px solid ${colors.backgroundDark3}`,
    color: colors.white,
  },
};

const BORDER_VARIENT = {
  PAYMENT_OK: {
    border: `1px solid ${colors.ok}`,
    filter: `drop-shadow(0 0 0.25rem ${colors.ok})`,
  },
  PAYMENT_WAITING: {},
  PAYMENT_CANCELED: {},
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
  item: {
    itemId: string;
    itemName: string;
    category: string;
    itemImageUrl: string;
    itemDescription: string;
    itemOrdering: string;
    orderState: 'PAYMENT_WAITING' | 'PAYMENT_OK' | 'PAYMENT_CANCELED';
    successTime: string;
    successPrice: string;
    successMemberNickname: string;
    deliveryAddress: string;
    deliveryMsg: string;
    invoice: { courier: string; invoiceNumber: string };
  };
}
