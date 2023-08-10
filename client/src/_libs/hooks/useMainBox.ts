/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import main, { AuctionRoomListResponse, BookmarkStatusRequest } from '../../api/main';
import auction from '../../api/auction';
import { useAppSelector } from '../../store/hooks';

export function useMainBox() {
  const { isLogined, accessToken } = useAppSelector(state => state.user);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [buttonCategoryList, setButtonCategoryList] = useState<number[]>([]);
  const [auctionListBookmarked, setAuctionListBookmarked] = useState<AuctionRoomListResponse[]>([]);
  const [auctionListBeforeLive, setAuctionListBeforeLive] = useState<AuctionRoomListResponse[]>([]);
  const [auctionListAfterLive, setAuctionListAfterLive] = useState<AuctionRoomListResponse[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 무한 스크롤링을 위한 상태
  const [page, setPage] = useState(1); // 초기 값은 1로 설정
  const [isFetching, setFetching] = useState(true);
  const [hasNextPage, setNextPage] = useState(true);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight - 500) {
        // 여기서 500은 미리 불러올 픽셀 수를 나타냅니다.
        setFetching(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // 진행중, 진행예정 경매 정보
  const searchAuctionList = {
    categoryList: buttonCategoryList,
    keyword: '',
    page: page,
    perPage: 8,
  };

  useEffect(() => {
    if (isFetching && hasNextPage) {
      const fetchMoreData = async () => {
        try {
          let res;
          if (!isLogined) {
            res = await main.get({ ...searchAuctionList, page });
          } else {
            res = await main.getLogined({ ...searchAuctionList, page }, accessToken);
          }
          const beforeLive = res.filter(item => item.auctionRoomLiveState === 'BEFORE_LIVE');
          const afterLive = res.filter(item => item.auctionRoomLiveState === 'ON_LIVE');

          // 현재 리스트에 추가로 받아온 데이터를 추가합니다.
          setAuctionListBeforeLive(prev => [...prev, ...beforeLive]);
          setAuctionListAfterLive(prev => [...prev, ...afterLive]);

          // 다음 페이지 정보를 업데이트 합니다.
          setPage(prev => prev + 1);
          setNextPage(res.length > 0); // 데이터가 더 있다면 true, 없다면 false로 설정합니다.
          setFetching(false);
        } catch (err) {
          console.log(err);
          setFetching(false);
        }
      };
      fetchMoreData();
    }
  }, [isFetching, buttonCategoryList]);

  const handleCategoryButtonClick = (categoryId: number) => {
    setButtonCategoryList(prevList =>
      prevList.includes(categoryId) ? prevList.filter(id => id !== categoryId) : [...prevList, categoryId]
    );
    setPage(1);
    setNextPage(true);
    setAuctionListBeforeLive([]);
    setAuctionListAfterLive([]);
    setFetching(true); // 카테고리 변경 시 바로 데이터를 가져오도록 설정
  };

  const handleBookmark = ({ auctionRoomId: auctionId }: BookmarkStatusRequest) => {
    main
      .bookmark({ auctionRoomId: auctionId }, accessToken)
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

  // 북마크한 경매정보
  const bookmarkList = {
    categoryList: buttonCategoryList,
    keyword: '',
    page: 1,
    perPage: 8,
  };
  useEffect(() => {
    main
      .getBookmarked(bookmarkList, accessToken)
      .then(res => {
        setAuctionListBookmarked(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [buttonCategoryList, refreshTrigger]);

  // 진행중, 진행예정 경매 정보
  // const searchAuctionList = {
  //   categoryList: buttonCategoryList,
  //   keyword: '',
  //   page: 1,
  //   perPage: 8,
  // };
  // useEffect(() => {
  //   if (!isLogined) {
  //     main
  //       .get(searchAuctionList)
  //       .then(res => {
  //         const beforeLive = res.filter(item => item.auctionRoomLiveState === 'BEFORE_LIVE');
  //         const afterLive = res.filter(item => item.auctionRoomLiveState === 'AFTER_LIVE');
  //         // const bookmarked = res.filter(item => item.bookmarked === true);
  //         setAuctionListBeforeLive(beforeLive);
  //         setAuctionListAfterLive(afterLive);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   } else if (isLogined) {
  //     main
  //       .getLogined(searchAuctionList, accessToken)
  //       .then(res => {
  //         const beforeLive = res.filter(item => item.auctionRoomLiveState === 'BEFORE_LIVE');
  //         const afterLive = res.filter(item => item.auctionRoomLiveState === 'AFTER_LIVE');
  //         // const bookmarked = res.filter(item => item.bookmarked === true);
  //         setAuctionListBeforeLive(beforeLive);
  //         setAuctionListAfterLive(afterLive);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   }
  // }, [buttonCategoryList, isFetching]);

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
