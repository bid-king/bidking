/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useState } from 'react';
import colors from '../../../design/colors';
import { Text } from '../../../components/common/Text';

import { Spacing } from '../../common/Spacing';
import { bidPriceParse } from '../../../util/bidPriceParse';
import { LiveItem, liveItemList } from '../../../../api/live';
import { Item } from '../../../../api/auction';
import { AuctionItem } from './AuctionItem';

export function AuctionItemStatus({
  theme,
  itemList = [
    DUMMY,
    DUMMY,
    {
      itemImg: 'abc',
      name: '김성용의 안경',
      status: 'complete',
      desc: '안녕 난 안경이야',
      itemId: 1,
      startPrice: 5000,
    },
    {
      itemImg: 'abc',
      name: '정예지의 샷건',
      status: 'complete',
      desc: '안녕 난 키보드야',
      itemId: 2,
      startPrice: 5000,
    },
    {
      itemImg: 'abc',
      name: '윤다정의 갤럭시 버즈',
      status: 'fail',
      desc: '안녕 난 이어폰이야',
      itemId: 3,
      startPrice: 5000,
    },
    {
      itemImg: 'abc',
      name: '유승윤의 스타벅스 커피 ',
      status: 'in',
      desc: '안녕 난 키보드야',
      itemId: 4,
      startPrice: 5000,
    },
    {
      itemImg: 'abc',
      name: '김동현의 스탠리 텀블러',
      status: 'before',
      desc: '안녕 난 키보드야',
      itemId: 5,
      startPrice: 5000,
    },
    {
      itemImg: 'abc',
      name: '김성용의 안경',
      status: 'before',
      desc: '안녕 난 안경이야',
      itemId: 6,
      startPrice: 5000,
    },
    {
      itemImg: 'abc',
      name: '정예지의 샷건',
      status: 'before',
      desc: '안녕 난 키보드야',
      itemId: 7,
      startPrice: 5000,
    },
    {
      itemImg: 'abc',
      name: '윤다정의 갤럭시 버즈',
      status: 'before',
      desc: '안녕 난 이어폰이야',
      itemId: 8,
      startPrice: 5000,
    },
    {
      itemImg: 'abc',
      name: '유승윤의 스타벅스 커피 ',
      status: 'before',
      desc: '안녕 난 키보드야',
      itemId: 9,
      startPrice: 5000,
    },
    {
      itemImg: 'abc',
      name: '김동현의 스탠리 텀블러',
      status: 'before',
      desc: '안녕 난 키보드야',
      itemId: 10,
      startPrice: 5000,
    },
    DUMMY,
    DUMMY,
  ],
  currentItemId,
  order,
}: Props) {
  return (
    <div
      css={{
        borderRadius: '2.25rem',
        display: 'flex',
        justifyContent: 'center',
        ...THEME_VARIANT[theme],
      }}
    >
      <div css={{ width: '100%', padding: '0 1rem 0 1rem', ...THEME_VARIANT[theme] }}>
        <div css={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {itemList?.map((item, idx, arr) => {
            console.log(arr);
            if (idx >= order - 2 && idx <= order + 2) return <AuctionItem item={item} idx={idx} key={idx} />;
          })}
        </div>
        <Spacing rem="1" />
        <div>
          {itemList?.map((item, idx) => {
            if (item.itemId === currentItemId)
              return (
                <div key={idx} css={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    css={{
                      background: `url(${item.itemImg}) no-repeat center center`,
                      borderRadius: '1rem',
                      border: '1px solid ' + colors.ok,
                      filter: `drop-shadow(0 0 0.075rem ${colors.ok})`,
                      width: '3rem',
                      height: '3rem',
                    }}
                  />
                  <Spacing rem="1" dir="h" />
                  <div css={{ display: 'flex', flexDirection: 'column' }}>
                    <Text type="h3" content={item.name} />
                    <Spacing rem="0.25" />
                    <Text content={'경매 시작가 ' + bidPriceParse(String(item.startPrice)) + '원'} />
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}
const THEME_VARIANT = {
  light: {
    background: colors.backgroundLight2,
  },
  dark: {
    background: colors.backgroundDark2,
  },
};

export const DUMMY: LiveItem = {
  itemImg: '',
  name: '',
  status: 'dummy',
  desc: '',
  itemId: -1,
  startPrice: 0,
};
interface Props {
  theme: 'light' | 'dark';
  itemList?: liveItemList;
  currentItemId: number;
  order: number;
}
