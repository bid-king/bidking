/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import auction, { AuctionRoomResponse } from '../../api/auction';
import { ItemCard } from '../../_libs/components/auctionInfo/ItemCard';
import { Spacing } from '../../_libs/components/common/Spacing';
import { Text } from '../../_libs/components/common/Text';
import colors from '../../_libs/design/colors';

export function Detail() {
  const params = useParams<string>();
  const auctionId = Number(params.auctionId);

  const [detail, setDetail] = useState<AuctionRoomResponse | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    auction
      .get(auctionId)
      .then(data => setDetail(data))
      .catch(err => setError(err));
  }, [auctionId]);

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '10rem',
        backgroundColor: colors.backgroundLight,
      }}
    >
      <Spacing rem="3" />
      <div
        css={{
          width: '50%',
          minHeight: '430px',
          padding: '0 1.5rem 0 1.5rem',
          backgroundColor: colors.backgroundLight2,
          borderRadius: '1.5rem',
        }}
      >
        <Spacing rem="1.5" />
        <Text type="h1" content="경매 상세보기" />
        <Spacing rem="1" />
        <div>{/* 상세정보 */}</div>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {error && <Text content={error.message} />}
          {detail && detail.itemList.map((item, idx) => <ItemCard item={item} key={idx} />)}
        </div>
      </div>
    </div>
  );
}
