/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useState } from 'react';
import colors from '../../design/colors';
import { Text } from '../common/Text';
import { Input } from '../common/Input';
import { Spacing } from '../common/Spacing';

export function ItemCard({ theme = 'light', item }: Props) {
  const [detailDisplay, setDetailDisplay] = useState<boolean>(false);
  return (
    <div
      className="container"
      css={{
        ...THEME_VARIENT[theme],
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
          <Text type="bold" content={String(item.successPrice)} />
        </div>
      </div>
      <div>
        <Text type="bold" content={item.successTime + ' 낙찰'} />
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

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
  item: {
    itemId: number;
    itemName: string;
    category: string;
    itemImageUrl: string;
    itemDescription: string;
    itemOrdering: number;
    itemState: 'PRE_AUCTION';
    successTime: string;
    successPrice: number;
    successMemberNickname: string;
    deliveryAddress: string;
    deliveryMsg: string;
    invoice: { courier: string; invoiceNumber: string };
  };
}
