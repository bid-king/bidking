/** @jsxImportSource @emotion/react */
import React from 'react';
import { ItemCardSeller } from '../../_libs/components/auctionInfo/ItemCardSeller';
import { Spacing } from '../../_libs/components/common/Spacing';
import { Text } from '../../_libs/components/common/Text';
import colors from '../../_libs/design/colors';
import { ConfirmButton } from '../../_libs/components/common/ConfirmButton';
import { QuestionModal } from '../../_libs/components/auctionCreate/QuestionModal';
import { detailDateParse } from '../../_libs/util/detailDateParse';
import { Link } from 'react-router-dom';
import { useSellerDetailOffLive } from '../../_libs/hooks/useSellerDetailOffLive';

export function SellerDetailOffLive() {
  const { auctionId, detail, error, isLogined, handleCheck, isChecked } = useSellerDetailOffLive();
  if (!detail) {
    return (
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '10rem',
          backgroundColor: colors.backgroundDark,
          color: colors.white,
          minHeight: '100vh',
        }}
      >
        로딩중입니다.
      </div>
    );
  }

  if (!isLogined) {
    return (
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          minHeight: '100vh',
          backgroundColor: colors.backgroundDark,
          color: colors.white,
          justifyContent: 'center',
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
        paddingBottom: '5rem',
        backgroundColor: colors.backgroundDark,
        minHeight: '100vh',
        color: colors.white,
      }}
    >
      <Spacing rem="3" />
      <div
        css={{
          width: '33vw',
          minWidth: '27rem',
          padding: '0 1.5rem 0 1.5rem',
          backgroundColor: colors.backgroundDark2,
          borderRadius: '1.5rem',
        }}
      >
        <Spacing rem="1.5" />

        <Text type="h1" content="경매 완료" />
        <Spacing rem="1.5" />
        <div>
          <Text type="h2" content={detail.name} />
          <Spacing rem="1" />
          <div
            className="auctionEnterPermission"
            css={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Text
              type="h3"
              content={
                detail.auctionRoomType === 'COMMON'
                  ? '일반경매'
                  : detail.auctionRoomType === 'REVERSE'
                  ? '네덜란드 경매'
                  : detail.auctionRoomType
              }
            />
            <Spacing rem="1" dir="h" />
            <div
              css={{
                marginTop: '0.2rem',
              }}
            >
              <QuestionModal
                content1="일반경매(English Auction): 이는 우리가 흔히 생각하는, 가장 전통적인 경매 방식입니다. 경매가 시작될 때 최소 입찰가격이 설정되며, 이후 참여자들은 그 가격보다 높은 가격으로 입찰합니다. 가장 높은 가격을 제시한 참여자가 물건을 얻게 됩니다."
                content2="네덜란드 경매(Dutch Auction): 이 경매 방식은 일반적인 경매와는 반대로, 가장 높은 가격에서 시작하여 점차 가격을 낮추는 방식입니다. 참가자들은 가격이 내려갈수록 입찰을 기다리다가, 자신이 원하는 가격에 도달했을 때 입찰을 합니다. 처음으로 입찰한 사람이 물건을 얻게 됩니다. 이 방식은 일반적으로 꽃이나 농산물 등 시간이 지날수록 가치가 떨어지는 상품을 판매할 때 사용됩니다."
              />
            </div>
          </div>
        </div>
        <div>
          <Text type="h3" content={`${detailDateParse(detail.startedAt)} 시작`} />
        </div>
        <Spacing rem="0.5" />
        {detail.itemList.some(item =>
          ['PAYMENT_WAITING', 'DELIVERY_WAITING', 'DELIVERING'].includes(item.orderState)
        ) && <ConfirmButton btnType="progress" label="결제/배송중" />}

        {detail.itemList.every(item => item.orderState === 'COMPLETED') && (
          <Link to={'/'}>
            <ConfirmButton btnType="ok" label="수령 완료" />
          </Link>
        )}

        <Spacing rem="1" />
        <Text type="h1" content="경매 물품" />
        <Spacing rem="1" />

        {error && <Text content={error.message} />}
        {detail.itemList.map((item, idx) => (
          <div key={idx}>
            <ItemCardSeller theme="dark" item={item} />
            <Spacing rem="1" />
          </div>
        ))}
      </div>
    </div>
  );
}
