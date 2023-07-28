import React, { useEffect, useState } from 'react';
import { SellerStream } from '../../_libs/components/meeting/SellerStream';

export function SellerAuction() {
  const roomId = 123;
  const userId = 123;
  const userType = 'seller';

  return (
    <div>
      (판매자)경매진행중 화면입니다.
      <SellerStream roomId={roomId} userId={userId} userType={userType} />
    </div>
  );
}
