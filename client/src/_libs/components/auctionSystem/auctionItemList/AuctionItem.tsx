/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes } from 'react';
import colors from '../../../design/colors';
import { Text } from '../../../components/common/Text';
import { LiveItem, liveItemList } from '../../../../api/live';
export function AuctionItem({ item, idx }: Props) {
  return (
    <div
      key={idx}
      css={{
        background: `${ITEM_STATUS_BG[item.status]} url('${item.imageUrl}') no-repeat center center `,
        backgroundSize: 'cover',
        backgroundPsition: 'center',
        borderRadius: '0.75rem',
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
  before: { color: colors.lightgrey, border: '1px solid ' + colors.grey },
  in: {
    color: 'transparent',
    border: '1px solid ' + colors.progress,
    filter: `drop-shadow(0 0 0.1rem ${colors.progress})`,
  },
  fail: { color: colors.lightgrey, border: '1px solid ' + colors.grey },
  complete: { color: colors.white, border: '1px solid ' + colors.ok },
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
