/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { DashBoard } from '../../_libs/components/common/DashBoard';
import order, { DashBoardResponce } from '../../api/order';
import { useAppSelector } from '../../store/hooks';
import { PurchasedBox } from './PurchasedBox';
import colors from '../../_libs/design/colors';
import { Spacing } from '../../_libs/components/common/Spacing';
import { Link } from 'react-router-dom';
import { Text } from '../../_libs/components/common/Text';

export function Purchased() {
  const { accessToken, id, isLogined } = useAppSelector(state => state.user);
  const [status, setStatus] = useState<DashBoardResponce | null>(null);

  // 구매자 대쉬보드
  useEffect(() => {
    if (id && isLogined) {
      order
        .getStatus(id, accessToken)
        .then(res => {
          setStatus(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  if (!isLogined) {
    return (
      <div
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '94vh',
          backgroundColor: colors.backgroundLight,
        }}
      >
        <Link to={'/login'}>
          <div>
            <Text type="h2" content="로그인이 필요한 서비스입니다." />
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '10rem',
        backgroundColor: colors.backgroundLight,
        minHeight: '100vh',
      }}
    >
      <Spacing rem="3" />
      <DashBoard
        theme="light"
        deliveryWaiting={status?.deliveryWaiting}
        paymentWaiting={status?.paymentWaiting}
        penalty={status?.penalty}
      />
      <Spacing rem="2" />
      <div
        css={{
          width: '33vw',
          minWidth: '27rem',
          padding: '0 1.5rem 0 1.5rem',
          backgroundColor: colors.backgroundLight2,
          borderRadius: '1.5rem',
        }}
      >
        <PurchasedBox />
      </div>
    </div>
  );
}
