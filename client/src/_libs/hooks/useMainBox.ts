/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import main, { AuctionRoomListResponse, BookmarkStatusRequest } from '../../api/main';
import auction from '../../api/auction';
import { useAppSelector } from '../../store/hooks';
import { useLocation } from 'react-router-dom';

export function useMainBox() {
  const { isLogined, accessToken } = useAppSelector(state => state.user);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [buttonCategoryList, setButtonCategoryList] = useState<number[]>([]);
  const [auctionListBookmarked, setAuctionListBookmarked] = useState<AuctionRoomListResponse[]>([]);
  const [auctionList, setAuctionList] = useState<AuctionRoomListResponse[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 검색
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const keyword = query.get('search');

  useEffect(() => {
    setAuctionList([]);
    setPage(1);
    setNextPage(true);
    setFetching(true);
  }, [keyword, buttonCategoryList]);

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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 진행중, 진행예정 경매 정보
  const searchAuctionList = {
    categoryList: buttonCategoryList,
    keyword: keyword ? keyword : '',
    page: page,
    perPage: 12,
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
          const auctionList = res;

          // 현재 리스트에 추가로 받아온 데이터를 추가합니다.
          setAuctionList(prev => [...prev, ...auctionList]);

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
  }, [isFetching, buttonCategoryList, keyword, page]);

  const handleCategoryButtonClick = (categoryId: number) => {
    setButtonCategoryList(prevList =>
      prevList.includes(categoryId) ? prevList.filter(id => id !== categoryId) : [...prevList, categoryId]
    );
  };

  const handleBookmark = ({ auctionRoomId: auctionId }: BookmarkStatusRequest) => {
    main
      .bookmark({ auctionRoomId: auctionId }, accessToken)
      .then(res => {
        setAuctionList(prevAuctions =>
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
    perPage: 100,
  };

  useEffect(() => {
    if (isLogined) {
      main
        .getBookmarked(bookmarkList, accessToken)
        .then(res => {
          setAuctionListBookmarked(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [buttonCategoryList, refreshTrigger]);

  return {
    isLogined,
    categoryList,
    buttonCategoryList,
    auctionListBookmarked,
    handleCategoryButtonClick,
    handleBookmark,
    auctionList,
    setAuctionList,
    setPage,
    setNextPage,
    setFetching,
  };
}
