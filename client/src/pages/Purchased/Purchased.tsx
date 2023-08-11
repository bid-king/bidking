/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { DashBoard } from '../../_libs/components/common/DashBoard';
import order, { DashBoardResponce } from '../../api/order';
import { useAppSelector } from '../../store/hooks';

export function Purchased() {
  const { accessToken, id, isLogined } = useAppSelector(state => state.user);
  const [status, setStatus] = useState<DashBoardResponce | null>(null);

  // 구매자 대쉬보드
  useEffect(() => {
    if (id && isLogined) {
      order.getStatus(id, accessToken).then(res => {
        setStatus(res);
      });
    }
  }, []);

  return (
    <div>
      <DashBoard
        theme="light"
        deliveryWaiting={status?.deliveryWaiting}
        paymentWaiting={status?.paymentWaiting}
        penalty={status?.penalty}
      />
    </div>
  );
}
