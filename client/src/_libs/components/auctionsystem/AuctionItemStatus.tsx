/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes } from 'react';
import colors from '../../design/colors';
import { Text } from '../../components/common/Text';
import { Input } from '../common/Input';
import itemState from '../../constants/itemState';
import { Spacing } from '../common/Spacing';
import { bidPriceParse } from '../../util/bidPriceParse';
import { ItemList } from '../../../api/live';

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
          {itemList.map((item, idx) => {
            if (idx >= currentItemId - 2 && idx <= currentItemId + 2)
              return (
                <div>
                  <div
                    key={idx}
                    css={{
                      background: `url(${item.itemImg}) no-repeat center center ${ITEM_STATUS_BG[item.status]}`,
                      borderRadius: '0.75rem',
                      border: '1px solid ' + colors.lightgrey,
                      width: '2.5rem',
                      height: '2.5rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '0.9rem',
                      ...ITEM_STATUS_CSS[item.status],
                    }}
                  >
                    <Text type="bold" content={ITEM_STATUS_TEXT[item.status]} />
                  </div>
                </div>
              );
          })}
        </div>
        <Spacing rem="1" />
        <div>
          {itemList.map((item, idx) => {
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
  itemList?: ItemList;
  currentItemId: number;
}
