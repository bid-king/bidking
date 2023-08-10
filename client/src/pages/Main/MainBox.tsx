/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import { Spacing } from '../../_libs/components/common/Spacing';
import { Text } from '../../_libs/components/common/Text';
import colors from '../../_libs/design/colors';
import { AuctionList } from '../../_libs/components/auction/AuctionList';
import { RoundButton } from '../../_libs/components/common/RoundButton';
import { auctionDateParse } from '../../_libs/util/auctionDateParse';
import { IconButton } from '../../_libs/components/common/IconButton';
import { useMainBox } from '../../_libs/hooks/useMainBox';

export function MainBox() {
  const {
    isLogined,
    categoryList,
    buttonCategoryList,
    auctionListBookmarked,
    handleCategoryButtonClick,
    handleBookmark,
    auctionListBeforeLive,
    auctionListAfterLive,
  } = useMainBox();

  return (
    <div>
      <div
        css={{
          backgroundColor: colors.backgroundLight2,
          padding: '0.7rem',
          display: 'flex',
          width: '100%',
        }}
      >
        {categoryList.map(category => (
          <div
            key={category.id}
            css={{
              display: 'flex',
            }}
          >
            <RoundButton
              color={buttonCategoryList.includes(category.id) ? 'confirm' : 'white'}
              size="small"
              label={category.name}
              onClick={() => handleCategoryButtonClick(category.id)}
            />
            <Spacing rem="0.5" dir="h" />
          </div>
        ))}
      </div>
      <div
        css={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {isLogined && (
          <div>
            <Text type="h1" content="관심 경매" />
            <div
              css={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {auctionListBookmarked.map((auction, index) => (
                <div
                  css={{
                    marginRight: '1rem',
                  }}
                  key={auction.id}
                >
                  <Link to={`seller/detail/${auction.id}`}>
                    <AuctionList
                      title={auction.name}
                      date={auctionDateParse(auction.startedAt)}
                      items={auction.itemListDto.map(item => item.name)}
                      img={auction.imageUrl}
                    />
                  </Link>
                  <Spacing rem="1" />
                </div>
              ))}
              {auctionListBookmarked.length === 0 && (
                <div
                  css={{
                    height: '20rem',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Text type="h2" content="관심 경매를 추가하세요" />
                </div>
              )}
            </div>
          </div>
        )}
        <div>
          <Text type="h1" content="진행 중인 경매" />
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
                {isLogined && (
                  <IconButton
                    type={auction.bookmarked ? 'starFilled' : 'star'}
                    color="confirm"
                    background="light"
                    size="small"
                    onClick={() => handleBookmark({ auctionRoomId: auction.id })}
                  />
                )}
                <Link to={`seller/detail/${auction.id}`}>
                  <AuctionList
                    title={auction.name}
                    date={auctionDateParse(auction.startedAt)}
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
                <Text type="h2" content="진행중인 경매가 존재하지 않습니다" />
              </div>
            )}
          </div>
        </div>
        <div>
          <Text type="h1" content="진행 예정 경매" />
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
                {isLogined && (
                  <IconButton
                    type={auction.bookmarked ? 'starFilled' : 'star'}
                    color="confirm"
                    background="light"
                    size="small"
                    onClick={() => handleBookmark({ auctionRoomId: auction.id })}
                  />
                )}
                <Link to={`detail/${auction.id}`}>
                  <AuctionList
                    title={auction.name}
                    date={auctionDateParse(auction.startedAt)}
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
      </div>
    </div>
  );
}
