import React from 'react';
import { OrderStream } from '../_libs/components/meeting/OrderStream';

export function OpenviduTestOrder() {
  return (
    <div>
      오픈비두 구매자 테스트 페이지
      <OrderStream auctionRoomId={123} userId={1} userType="order" />
    </div>
  );
}
