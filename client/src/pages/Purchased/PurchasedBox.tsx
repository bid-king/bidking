/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { DashBoard } from '../../_libs/components/common/DashBoard';
import order, { DashBoardResponce } from '../../api/order';
import { useAppSelector } from '../../store/hooks';
import { OrderItemResponse } from '../../api/order';
import { ItemPurchased } from '../../_libs/components/auctionPurchased/ItemPurchased';
import { Text } from '../../_libs/components/common/Text';
import { Spacing } from '../../_libs/components/common/Spacing';
import colors from '../../_libs/design/colors';

export function PurchasedBox() {
  const [orderItemList, setOrderItemList] = useState<OrderItemResponse[] | null>(null);
  const { accessToken, isLogined } = useAppSelector(state => state.user);

  // 낙찰물품 GET
  useEffect(() => {
    if (isLogined) {
      order
        .get(accessToken)
        .then(res => {
          setOrderItemList(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  if (!orderItemList) {
    return (
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          minHeight: '100vh',
          backgroundColor: colors.backgroundLight,
          justifyContent: 'center',
        }}
      >
        <div>
          <Text type="h2" content="경매 물품이 존재하지 않아요" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Spacing rem="1.5" />
      <Text type="h1" content="낙찰 물품 목록" />
      <Spacing rem="1.5" />
      {orderItemList.map(orderItem => {
        return (
          <div key={orderItem.orderItemId}>
            <ItemPurchased item={orderItem} />
            <Spacing rem="1" />
          </div>
        );
      })}
    </div>
  );
}
