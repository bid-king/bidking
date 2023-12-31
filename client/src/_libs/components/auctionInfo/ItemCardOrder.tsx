/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useState } from 'react';
import colors from '../../design/colors';
import { Text } from '../common/Text';
import paymentState from '../../constants/paymentState';
import { Input } from '../common/Input';
import { Spacing } from '../common/Spacing';
import orderState from '../../constants/orderState';
import { ConfirmButton } from '../common/ConfirmButton';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
  item: {
    sellerName: string;
    currentState: 'PAYMENT_WAITING';
    order: {
      orderId: string;
      orderAt: string;

      auctionRoomId: string;
      price: string;
    };
    delivery: {
      deliveryId: string;
      deliveryMsg: string;
      address: {
        street: string;
        details: string;
        zipcode: string;
      };
    };
    item: {
      itemId: string;
      name: string;
      description: string;
      image: {
        id: string;
        createdAt: string;
        fileName: string;
        filePath: string;
      };
    };
  };
}

export function ItemCardOrder({ theme = 'light', item }: Props) {
  const [detailDisplay, setDetailDisplay] = useState<boolean>(false);
  return (
    <div
      className="container"
      css={{
        ...THEME_VARIENT[theme],
        ...BORDER_VARIENT[item.currentState],
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
        <Text content={'낙찰번호 ' + item.order.orderId} />
        <Text type="bold" content={paymentState[item.currentState]} />
      </div>
      <Spacing rem="1" />
      <div className="cardBody-ItemName">
        <Text type="h3" content={item.item.name} />
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
          <Text content={'판매자 '} css={{ fontSize: '3rem' }} />
          <Text type="bold" content={item.sellerName} />
        </div>
        <div>
          <Text content={'낙찰가 '} />
          <Text type="bold" content={item.order.price} />
        </div>
      </div>
      <div>
        <Text type="bold" content={item.order.orderAt + ' 낙찰'} />
      </div>
      <Spacing rem="1" />
      {item.currentState === 'PAYMENT_WAITING' ? (
        <ConfirmButton btnType="confirm" label={`${item.order.orderAt}일 까지 결제해야 해요.`} />
      ) : (
        <ConfirmButton btnType="ok" label={'영수증 보기'} />
      )}
      <Spacing rem="1" />
      <div>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Text content={'배송지'} />
          <Text
            type="bold"
            content={`(${item.delivery.address.zipcode}) ${item.delivery.address.street} ${item.delivery.address.details}`}
          />
          <Text content={'배송 메시지'} />
          <Text type="bold" content={item.delivery.deliveryMsg} />
        </div>
      </div>
      <div
        css={{
          display: 'flex',
        }}
      ></div>
      <Spacing rem="1" />
      {/*이 아래는 접으면 접히는 부분*/}
      <div
        css={{
          display: `${detailDisplay ? 'block' : 'none'}`,
        }}
      >
        <div>
          <img
            src={item.item.image.filePath}
            alt={item.item.description}
            css={{
              borderRadius: '1rem',
              width: '100%',
              maxHeight: '15rem',
            }}
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/image/bid.jpg';
            }}
          />
          <Spacing rem="1" />
        </div>
        <div>
          <Text type="normal" content={item.item.description} />
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
  PAYMENT_WAITING: {
    border: `1px solid ${colors.confirm}`,
    filter: `drop-shadow(0 0 0.25rem ${colors.confirm})`,
  },
  PAYMENT_CANCELED: {},
};

const COLOR_VARIENT = {
  PAYMENT_OK: {
    color: colors.ok,
  },
  PAYMENT_WAITING: {
    color: colors.confirm,
  },
  PAYMENT_CANCELED: {},
};
