/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import main, { AuctionRoomListResponse, BookmarkStatusRequest } from '../../api/main';
import { Spacing } from '../../_libs/components/common/Spacing';
import { Text } from '../../_libs/components/common/Text';
import colors from '../../_libs/design/colors';
import { AuctionList } from '../../_libs/components/auction/AuctionList';
import { RoundButton } from '../../_libs/components/common/RoundButton';
import auction from '../../api/auction';
import { auctionDateParse } from '../../_libs/util/auctionDateParse';
import { IconButton } from '../../_libs/components/common/IconButton';
import { useAppSelector } from '../../store/hooks';

export function MainBox() {
  const isLogined = useAppSelector(state => state.user.isLogined);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [buttonCategoryList, setButtonCategoryList] = useState<number[]>([]);
  const [auctionListBookmarked, setAuctionListBookmarked] = useState<AuctionRoomListResponse[]>([]);
  const [auctionListBeforeLive, setAuctionListBeforeLive] = useState<AuctionRoomListResponse[]>([]);
  const [auctionListAfterLive, setAuctionListAfterLive] = useState<AuctionRoomListResponse[]>([]);

  const handleCategoryButtonClick = (categoryId: number) => {
    setButtonCategoryList(prevList =>
      prevList.includes(categoryId) ? prevList.filter(id => id !== categoryId) : [...prevList, categoryId]
    );
  };

  const handleBookmark = ({ auctionRoomId: auctionId }: BookmarkStatusRequest) => {
    // console.log(JSON.stringify({ auctionRoomId: auctionId }));
    main.bookmark({ auctionRoomId: auctionId }).then(res => {
      console.log(res);
    });
  };
  // 카테고리 리스트
  interface Category {
    id: number;
    name: string;
  }
  useEffect(() => {
    auction
      .getCategoryList()
      .then(data => {
        setCategoryList(data.categoryList);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // 진행중, 진행예정 경매 정보
  const searchAuctionList = {
    categoryList: buttonCategoryList,
    keyword: '',
    page: 1,
    perPage: 8,
  };
  useEffect(() => {
    main
      .get(searchAuctionList)
      .then(res => {
        const beforeLive = res.filter(item => item.auctionRoomLiveState === 'BEFORE_LIVE');
        const afterLive = res.filter(item => item.auctionRoomLiveState === 'AFTER_LIVE');
        // const bookmarked = res.filter(item => item.bookmarked === true);
        setAuctionListBeforeLive(beforeLive);
        setAuctionListAfterLive(afterLive);
      })
      .catch(err => {
        console.log(err);
      });
  }, [buttonCategoryList]);

  // 북마크한 경매정보
  const bookmarkList = {
    categoryList: buttonCategoryList,
    keyword: '',
    page: 1,
    perPage: 8,
  };
  useEffect(() => {
    main
      .getBookmarked(bookmarkList)
      .then(res => {
        setAuctionListBookmarked(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [buttonCategoryList]);

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
