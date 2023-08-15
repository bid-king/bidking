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
        backgroundImage: `url('${item.imageUrl}')`,
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
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
      {/* <img src={} css={{ zIndex: '99', width: '100%', maxHeight: '100%' }} /> */}
      <div
        css={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: colors.white,
        }}
      >
        <Text type="bold" content={ITEM_STATUS_TEXT[item.status]} />
      </div>
    </div>
  );
}

const ITEM_STATUS_CSS = {
  dummy: { border: '1px solid transparent' },
  before: { color: 'grayscale(1)', border: '1px solid ' + colors.grey },
  in: {
    color: 'transparent',
    border: '1px solid ' + colors.confirm,
    filter: `drop-shadow(0 0 0.75rem ${colors.confirm})`,
  },
  fail: { filter: 'grayscale(1)', border: '1px solid ' + colors.grey },
  complete: { filter: 'grayscale(1)', border: '1px solid ' + colors.ok },
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
