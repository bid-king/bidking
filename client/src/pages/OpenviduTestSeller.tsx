import React from 'react';
import { SellerStream } from '../_libs/components/meeting/SellerStream';

export function OpenviduTestSeller() {
  return (
    <div>
      오픈비두 판매자 테스트 페이지
      <SellerStream auctionRoomId={123} userId={123} userType="seller" />
    </div>
  );
}
