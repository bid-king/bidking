/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spacing } from '../../_libs/components/common/Spacing';
import { Text } from '../../_libs/components/common/Text';
import colors from '../../_libs/design/colors';
import { AuctionList } from '../../_libs/components/main/AuctionList';
import { useSellerBox } from '../../_libs/hooks/useSellerBox';
import { DashBoard } from '../../_libs/components/common/DashBoard';

export function SellerBox() {
  const { auctionListBeforeLive, auctionListAfterLive, isLogined, status } = useSellerBox();
  return (
    <div
      css={{
        padding: '1rem',
      }}
    >
      {isLogined && (
        <div>
          <Spacing rem="1" />
          <div
            css={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              color: colors.white,
            }}
          >
            <DashBoard
              theme="dark"
              deliveryWaiting={status?.deliveryWaiting}
              paymentWaiting={status?.paymentWaiting}
              penalty={status?.penalty}
            />
          </div>
          <Spacing rem="1" />
          <div
            css={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div>
              <Text type="h1" content="진행 예정 경매" />
              <Spacing rem="1" />
              <div
                css={{
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                {auctionListBeforeLive.map((auction, index) => (
                  <div
                    css={{
                      marginRight: '1rem',
                    }}
                    key={auction.id}
                  >
                    <Link to={`/seller/detail/${auction.id}`}>
                      <AuctionList
                        title={auction.name}
                        date={auction.startedAt}
                        items={auction.itemListDto.map(item => item.name)}
                        img={auction.imageUrl}
                      />
                    </Link>
                    <Spacing rem="1" />
                  </div>
                ))}
                {auctionListBeforeLive.length === 0 && (
                  <div
                    css={{
                      height: '20rem',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Text type="h2" content="진행중인 경매가 존재하지 않습니다" />
                  </div>
                )}
              </div>
            </div>
            <div>
              <Text type="h1" content="완료된 경매" />
              <Spacing rem="1" />
              <div
                css={{
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                {auctionListAfterLive.map((auction, index) => (
                  <div
                    css={{
                      marginRight: '1rem',
                    }}
                    key={auction.id}
                  >
                    <Link to={`/seller/detail/complete/${auction.id}`}>
                      <AuctionList
                        title={auction.name}
                        date={auction.startedAt}
                        items={auction.itemListDto.map(item => item.name)}
                        img={auction.imageUrl}
                      />
                    </Link>
                    <Spacing rem="1" />
                  </div>
                ))}
                {auctionListAfterLive.length === 0 && (
                  <div
                    css={{
                      height: '20rem',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Text type="h2" content="완료된 경매가 존재하지 않습니다" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {!isLogined && (
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            height: ' 91.5vh',
            justifyContent: 'center',
          }}
        >
          <Link to={'/login'}>
            <div>
              <Text type="h2" content="로그인이 필요한 서비스입니다." />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
