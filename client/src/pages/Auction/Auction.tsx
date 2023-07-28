import React, { useEffect, useState } from 'react';
import { BuyerStream } from '../../_libs/components/meeting/BuyerStream';

export function Auction() {
  const roomId = 123;
  const userId = 4;
  const userType = 'buyer';

  return (
    <div>
      (구매자)경매진행중 화면입니다.
      <BuyerStream roomId={roomId} userId={userId} userType={userType} />
    </div>
  );
}
