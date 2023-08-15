/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useState } from 'react';
import colors from '../../design/colors';
import { Text } from '../common/Text';
import paymentState from '../../constants/paymentState';
import { Input } from '../common/Input';
import { Spacing } from '../common/Spacing';
import { detailDateParse } from '../../util/detailDateParse';

export function ItemCardSeller({ theme = 'dark', item }: Props) {
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
        <div
          css={{
            ...TEXT_VARIENT[item.orderState],
          }}
        >
          <Text type="bold" content={paymentState[item.orderState]} />
        </div>
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
        {item.successMemberNickname && (
          <div
            css={{
              width: '50%',
            }}
          >
            <Text content={'낙찰자 '} />
            <Text type="bold" content={item.successMemberNickname} />
          </div>
        )}
        {item.price && (
          <div>
            <Text content={'낙찰가 '} />
            <Text type="bold" content={item.price.toString()} />
          </div>
        )}
      </div>
      <Spacing rem="1" />

      <div>
        <Text type="bold" content={item.successTime ? detailDateParse(item.successTime) + ' 낙찰' : ''} />
      </div>
      <Spacing rem="1" />
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Text content={'배송정보'} />
        {item.deliveryAddress && item.deliveryAddress.length > 0 ? (
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Text type="bold" content={item.deliveryAddress ? item.deliveryAddress : ''} />
            <Text type="bold" content={item.deliveryMsg ? item.deliveryMsg : ''} />
          </div>
        ) : (
          <div>
            <Text content={'낙찰자가 배송지를 입력하지 않았어요'} />
            <div
              css={{
                display: 'flex',
              }}
            >
              <Input theme={theme} inputType="text" placeholder="택배사" />
              <Input theme={theme} inputType="text" placeholder="배송메시지" />
            </div>
          </div>
        )}
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
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/image/nonImageDark.png';
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
  PAYMENT_WAITING: { border: `1px solid ${colors.confirm}`, filter: `drop-shadow(0 0 0.25rem ${colors.confirm})` },
  DELIVERY_WAITING: { border: `1px solid ${colors.confirm}`, filter: `drop-shadow(0 0 0.25rem ${colors.confirm})` },
  DELIVERING: { border: `1px solid ${colors.progress}`, filter: `drop-shadow(0 0 0.25rem ${colors.progress})` },
  COMPLETED: { border: `1px solid ${colors.ok}`, filter: `drop-shadow(0 0 0.25rem ${colors.ok})` },
  ORDER_CANCELED: { border: `1px solid ${colors.warn}`, filter: `drop-shadow(0 0 0.25rem ${colors.warn})` },
  DELIVERY_CANCELED: { border: `1px solid ${colors.warn}`, filter: `drop-shadow(0 0 0.25rem ${colors.warn})` },
  ORDER_FAILED: { border: `1px solid ${colors.warn}`, filter: `drop-shadow(0 0 0.25rem ${colors.warn})` },
};

const TEXT_VARIENT = {
  PAYMENT_WAITING: { color: colors.confirm },
  DELIVERY_WAITING: { color: colors.confirm },
  DELIVERING: { color: colors.progress },
  COMPLETED: { color: colors.ok },
  ORDER_CANCELED: { color: colors.warn },
  DELIVERY_CANCELED: { color: colors.warn },
  ORDER_FAILED: { color: colors.warn },
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
  item: {
    itemId: number;
    itemName: string;
    category: string;
    price: number;
    itemImageUrl: string;
    itemDescription: string;
    itemOrdering: number;
    successTime: string | null;
    successMemberId: number | null;
    successMemberNickname: string | null;
    deliveryAddress: string | null;
    deliveryMsg: string | null;
    orderState:
      | 'PAYMENT_WAITING'
      | 'DELIVERY_WAITING'
      | 'DELIVERING'
      | 'COMPLETED'
      | 'ORDER_CANCELED'
      | 'DELIVERY_CANCELED'
      | 'ORDER_FAILED';
    invoice?: { courier: string; invoiceId?: number; invoiceNumber: string };
  };
}

interface Invoice {
  courier: string;
  invoiceId?: number;
  invoiceNumber: string;
}
