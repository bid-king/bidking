/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import { Spacing } from '../../_libs/components/common/Spacing';
import { Text } from '../../_libs/components/common/Text';
import colors from '../../_libs/design/colors';
import { AuctionList } from '../../_libs/components/main/AuctionList';
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
    auctionList,
    column,
    width,
  } = useMainBox();

  return (
    <>
      <div>
        <div
          css={{
            display: 'flex',
            height: '3rem',
            padding: '1rem 0 1rem 2rem',
            alignItems: 'center',
            background: colors.backgroundLight2,
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
        <Spacing rem="2" />
      </div>
      <div>
        <div
          css={{
            display: 'flex',
          }}
        ></div>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: '0 2rem 0 2rem',
          }}
        >
          {isLogined && auctionListBookmarked.length !== 0 && (
            <div>
              <Text type="h1" content="관심 경매" />
              <Spacing rem="1" />
              <div
                css={{
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                {auctionListBookmarked.map((auction, index) => (
                  <div
                    css={{
                      position: 'relative',
                      marginRight: '1rem',
                    }}
                    key={auction.id}
                  >
                    <Link to={`/detail/${auction.id}`}>
                      <AuctionList
                        title={auction.name}
                        date={auction.startedAt}
                        items={auction.itemListDto.map(item => item.name)}
                        img={auction.imageUrl}
                        auctionRoomLiveState={auction.auctionRoomLiveState}
                      />
                    </Link>
                    {isLogined && (
                      <div
                        css={{
                          position: 'absolute',
                          top: '0.75rem',
                          right: '0.75rem',
                        }}
                      >
                        <IconButton
                          type={auction.bookmarked ? 'starFilled' : 'star'}
                          color="confirm"
                          background="white"
                          size="small"
                          onClick={event => {
                            event.stopPropagation();
                            handleBookmark({ auctionRoomId: auction.id });
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <Spacing rem="3" />
          <div>
            <Text type="h1" content="전체보기" />
            <Spacing rem="1" />
            <div
              css={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {auctionList.map(auction => (
                <div
                  css={{
                    marginRight: '1rem',
                    position: 'relative',
                  }}
                  key={auction.id}
                >
                  <Link to={isLogined ? `/detail/${auction.id}` : '/login'}>
                    <AuctionList
                      title={auction.name}
                      date={auction.startedAt}
                      items={auction.itemListDto.map(item => item.name)}
                      img={auction.imageUrl}
                      auctionRoomLiveState={auction.auctionRoomLiveState}
                    />
                  </Link>

                  {isLogined && (
                    <div
                      css={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                      }}
                    >
                      <IconButton
                        type={auction.bookmarked ? 'starFilled' : 'star'}
                        color="confirm"
                        background="white"
                        size="small"
                        onClick={event => {
                          event.stopPropagation();
                          handleBookmark({ auctionRoomId: auction.id });
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}

              {auctionList.length === 0 && (
                <div
                  css={{
                    height: '20rem',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Text content="경매가 존재하지 않습니다" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
