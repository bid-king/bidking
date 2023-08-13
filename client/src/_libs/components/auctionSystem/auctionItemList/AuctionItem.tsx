/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes } from 'react';
import colors from '../../design/colors';
import { Text } from '../../components/common/Text';
import { Input } from '../common/Input';
import itemState from '../../constants/itemState';
import { Spacing } from '../common/Spacing';
import { bidPriceParse } from '../../util/bidPriceParse';
import { LiveItem, liveItemList } from '../../../api/live';
import { Item } from '../../../api/auction';
export function AuctionItem({ item, idx }: Props) {
  return (
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
  );
}
const ITEM_STATUS_BG = {
  dummy: 'transparent',
  before: 'transparent',
  in: 'transparent',
  fail: colors.backgroundDark3,
  complete: colors.backgroundDark3,
};
const ITEM_STATUS_CSS = {
  dummy: { color: 'transparent', border: '1px solid ' + colors.grey },
  before: { color: colors.lightgrey },
  in: { color: 'transparent', border: '1px solid ' + colors.ok, filter: `drop-shadow(0 0 0.15rem ${colors.ok})` },
  fail: { color: colors.lightgrey },
  complete: { color: colors.white },
};
const ITEM_STATUS_TEXT = {
  dummy: '',
  before: '대기',
  in: '',
  fail: '유찰',
  complete: '낙찰',
};
interface Props {
  item: LiveItem;
  idx: number;
}
