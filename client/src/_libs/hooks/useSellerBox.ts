import React, { useEffect, useState } from 'react';
import auction, { SellerAuctionRoomListResponse, ItemListDto } from '../../api/auction';
import { useAppSelector } from '../../store/hooks';
import { useSellerDetail } from './useSellerDetail';
import seller, { SellerDashBoardResponce } from '../../api/seller';

export function useSellerBox() {
  const [auctionListBeforeLive, setAuctionListBeforeLive] = useState<SellerAuctionRoomListResponse[]>([]);
  const [auctionListAfterLive, setAuctionListAfterLive] = useState<SellerAuctionRoomListResponse[]>([]);
  const { id, isLogined, accessToken } = useAppSelector(state => state.user);
  const [status, setStatus] = useState<SellerDashBoardResponce | null>(null);

  useEffect(() => {
    auction
      .getSellerAuctionListBeforeLive(accessToken)
      .then(data => {
        setAuctionListBeforeLive(data);
      })
      .catch(err => {
        console.log(err);
      });
    auction
      .getSellerAuctionListAfterLive(accessToken)
      .then(data => {
        setAuctionListAfterLive(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // 판매자 대쉬보드
  useEffect(() => {
    if (id && isLogined) {
      seller
        .getStatus(id, accessToken)
        .then(res => {
          setStatus(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);
  return { auctionListBeforeLive, auctionListAfterLive, isLogined, status };
}
