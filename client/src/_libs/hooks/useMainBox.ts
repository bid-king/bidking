/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import main, { AuctionRoomListResponse, BookmarkStatusRequest } from '../../api/main';
import auction from '../../api/auction';
import { auctionDateParse } from '../util/auctionDateParse';
import { IconButton } from '../components/common/IconButton';
import { useAppSelector } from '../../store/hooks';

export function useMainBox() {
  const isLogined = useAppSelector(state => state.user.isLogined);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [buttonCategoryList, setButtonCategoryList] = useState<number[]>([]);
  const [auctionListBookmarked, setAuctionListBookmarked] = useState<AuctionRoomListResponse[]>([]);
  const [auctionListBeforeLive, setAuctionListBeforeLive] = useState<AuctionRoomListResponse[]>([]);
  const [auctionListAfterLive, setAuctionListAfterLive] = useState<AuctionRoomListResponse[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCategoryButtonClick = (categoryId: number) => {
    setButtonCategoryList(prevList =>
      prevList.includes(categoryId) ? prevList.filter(id => id !== categoryId) : [...prevList, categoryId]
    );
  };

  const handleBookmark = ({ auctionRoomId: auctionId }: BookmarkStatusRequest) => {
    main
      .bookmark({ auctionRoomId: auctionId })
      .then(res => {
        setAuctionListBeforeLive(prevAuctions =>
          prevAuctions.map(auction =>
            auction.id === res.auctionRoomId ? { ...auction, bookmarked: !auction.bookmarked } : auction
          )
        );
        setAuctionListAfterLive(prevAuctions =>
          prevAuctions.map(auction =>
            auction.id === res.auctionRoomId ? { ...auction, bookmarked: !auction.bookmarked } : auction
          )
        );
        setRefreshTrigger(prev => prev + 1);
      })
      .catch(err => {
        console.log(err);
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
    if (!isLogined) {
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
    } else if (isLogined) {
      main
        .getLogined(searchAuctionList)
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
    }
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
  }, [buttonCategoryList, refreshTrigger]);

  return {
    isLogined,
    categoryList,
    buttonCategoryList,
    auctionListBookmarked,
    handleCategoryButtonClick,
    handleBookmark,
    auctionListBeforeLive,
    auctionListAfterLive,
  };
}
