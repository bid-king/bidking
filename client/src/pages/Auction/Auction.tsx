import React, { useEffect, useState } from 'react';
import Buyer from '../../_libs/components/meeting/Buyer';

export function Auction() {
  const roomId = 123;
  const userId = 4;
  const userType = 'buyer';

  return (
    <div>
      (구매자)경매진행중 화면입니다.
      <Buyer roomId={roomId} userId={userId} userType={userType} />
    </div>
  );
}
