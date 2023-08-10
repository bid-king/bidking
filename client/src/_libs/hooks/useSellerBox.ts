import React, { useEffect, useState } from 'react';
import auction, { SellerAuctionRoomListResponse, ItemListDto } from '../../api/auction';
import { useAppSelector } from '../../store/hooks';
import { useSellerDetailOffLive } from './useSellerDetailOffLive';
export function useSellerBox() {
  const [auctionListBeforeLive, setAuctionListBeforeLive] = useState<SellerAuctionRoomListResponse[]>([]);
  const [auctionListAfterLive, setAuctionListAfterLive] = useState<SellerAuctionRoomListResponse[]>([]);
  const { isLogined, accessToken } = useAppSelector(state => state.user);

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
  return { auctionListBeforeLive, auctionListAfterLive, isLogined };
}
