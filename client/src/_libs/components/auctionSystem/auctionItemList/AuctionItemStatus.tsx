/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useState } from 'react';
import colors from '../../../design/colors';
import { Text } from '../../../components/common/Text';

import { Spacing } from '../../common/Spacing';
import { bidPriceParse } from '../../../util/bidPriceParse';
import { LiveItem, liveItemList } from '../../../../api/live';
import { Item } from '../../../../api/auction';
import { AuctionItem } from './AuctionItem';

export function AuctionItemStatus({ theme, itemList, currentItemId, order }: Props) {
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
          {itemList ? (
            itemList?.map((item, idx) => {
              if (idx >= order - 2 && idx <= order + 2) return <AuctionItem item={item} idx={idx} key={idx} />;
            })
          ) : (
            <div />
          )}
        </div>
        <Spacing rem="1" />
        <div>
          <div>
            {itemList ? (
              itemList?.map((item, idx) => {
                if (item.itemId === currentItemId)
                  return (
                    <div css={{ display: 'flex', alignItems: 'center' }} key={idx}>
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
              })
            ) : (
              <>
                <div
                  css={{
                    background: 'transparent',
                    borderRadius: '1rem',
                    border: '1px solid ' + colors.whitegrey,
                    width: '100%',
                    height: '3rem',
                  }}
                />
                <Spacing rem="1" dir="h" />
                <div
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    height: '3.25rem',
                  }}
                >
                  <Text type="h2" content="경매 대기" />
                </div>
              </>
            )}
          </div>
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
