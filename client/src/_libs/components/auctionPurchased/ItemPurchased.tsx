/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useState } from 'react';
import colors from '../../design/colors';
import { Text } from '../common/Text';
import paymentState from '../../constants/paymentState';
import { Input } from '../common/Input';
import { Spacing } from '../common/Spacing';
import { detailDateParse } from '../../util/detailDateParse';
import { ConfirmButton } from '../common/ConfirmButton';
import { paymentDeadlineParse } from '../../util/paymentDeadlineParse';

export function ItemPurchased({ theme = 'light', item }: Props) {
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
        <Text type="bold" content={'물품 ID ' + item.orderItemId} />
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
        <Text type="h3" content={item.orderItemName} />
      </div>
      <Spacing rem="1" />
      <div
        className="cardBody-orderInfo"
        css={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {item.sellerNickName && (
          <div
            css={{
              width: '50%',
            }}
          >
            <Text content={'판매자 '} />
            <Text type="bold" content={item.sellerNickName} />
          </div>
        )}
        {item.orderPrice && (
          <div>
            <Text content={'낙찰가 '} />
            <Text type="bold" content={item.orderPrice.toString()} />
          </div>
        )}
      </div>
      <Spacing rem="1" />
      <div
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
          <Text content={'낙찰 시간 '} />
          <Text type="bold" content={item.paymentDeadline ? detailDateParse(item.orderedAt) : ''} />
        </div>

        <div>
          <Text content={'결제 기한 '} />
          <Text type="bold" content={item.paymentDeadline ? detailDateParse(item.paymentDeadline) : ''} />
        </div>
      </div>
      <Spacing rem="1" />

      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {item.address && (
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Text type="bold" content="배송지" />
            <Spacing rem="1" />
            <Text type="bold" content={`${item.address.street} ${item.address.details} ${item.address.zipCode}`} />
          </div>
        )}
      </div>
      <Spacing rem="1" />
      {item.orderState === 'PAYMENT_WAITING' && (
        <div>
          <ConfirmButton
            btnType="confirm"
            label={`결제 (${paymentDeadlineParse(item.paymentDeadline)}일 안에 결제해야 해요)`}
          />
          <Spacing rem="1" />
        </div>
      )}

      {/*이 아래는 접으면 접히는 부분*/}
      <div
        css={{
          display: `${detailDisplay ? 'block' : 'none'}`,
        }}
      >
        <div>
          <img
            src={item.itemImageURL}
            alt={item.itemDescription}
            css={{
              borderRadius: '1rem',
              width: '100%',
              maxHeight: '15rem',
            }}
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/image/nonImageLight.png';
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
    orderItemId: number;
    orderItemName: string;
    orderedAt: string;
    paymentDeadline: string;
    orderPrice: number;
    sellerNickName: string;
    itemImageURL: string;
    itemDescription: string;
    orderState:
      | 'PAYMENT_WAITING'
      | 'DELIVERY_WAITING'
      | 'DELIVERING'
      | 'COMPLETED'
      | 'ORDER_CANCELED'
      | 'DELIVERY_CANCELED'
      | 'ORDER_FAILED';
    address: Address;
  };
}

interface Address {
  street: string;
  details: string;
  zipCode: string;
}
