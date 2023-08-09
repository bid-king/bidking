/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes } from 'react';
import colors from '../../design/colors';
import { Text } from '../../components/common/Text';
import { Input } from '../common/Input';
import itemState from '../../constants/itemState';
import { Spacing } from '../common/Spacing';
import { bidPriceParse } from '../../util/bidPriceParse';

export function AuctionItemStatus({
  theme,
  itemList = [
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
  ],
  currentItemId = 2,
}: Props) {
  return (
    <div css={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div css={{ ...THEME_VARIANT[theme], padding: '0 2rem 0 2rem', minWidth: '22rem', width: '100%' }}>
        <div css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {itemList.map((item, idx) => {
            if (idx >= currentItemId - 2 && idx <= currentItemId + 2)
              return (
                <div
                  key={idx + 1}
                  css={{
                    background: `url(${item.itemImg}) no-repeat center center ${ITEM_STATUS_BG[item.status]}`,
                    borderRadius: '0.75rem',
                    border: '1px solid ' + colors.lightgrey,
                    width: '3rem',
                    height: '3rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '0.925rem',
                    ...ITEM_STATUS_CSS[item.status],
                  }}
                >
                  <Text type="bold" content={ITEM_STATUS_TEXT[item.status]} />
                </div>
              );
          })}
        </div>
        <Spacing rem="1.5" />
        <div>
          {itemList.map((item, idx) => {
            if (item.itemId === currentItemId)
              return (
                <div key={idx} css={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div
                    css={{
                      background: `url(${item.itemImg}) no-repeat center center`,
                      borderRadius: '0.75rem',
                      border: '1px solid ' + colors.ok,
                      filter: `drop-shadow(0 0 0.15rem ${colors.ok})`,
                      width: '4rem',
                      height: '4rem',
                    }}
                  />
                  <Spacing rem="1" dir="h" />
                  <div css={{ display: 'flex', flexDirection: 'column' }}>
                    <Text type="h3" content={item.name} />
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
    background: 'transparent',
  },
  dark: {
    background: 'transparent',
  },
};
const ITEM_STATUS_BG = {
  before: 'transparent',
  in: 'transparent',
  fail: colors.backgroundDark3,
  complete: colors.backgroundDark3,
};
const ITEM_STATUS_CSS = {
  before: { color: colors.lightgrey },
  in: { color: 'transparent', border: '1px solid ' + colors.ok, filter: `drop-shadow(0 0 0.15rem ${colors.ok})` },
  fail: { color: colors.lightgrey },
  complete: { color: colors.white },
};
const ITEM_STATUS_TEXT = {
  before: '대기',
  in: '',
  fail: '유찰',
  complete: '낙찰',
};

interface Props {
  theme: 'light' | 'dark';
  itemList?: {
    itemId: number;
    itemImg: string;
    name: string;
    status: 'before' | 'in' | 'fail' | 'complete';
    desc: string;
    startPrice: number;
  }[];
  currentItemId: number;
}
