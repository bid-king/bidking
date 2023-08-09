import React, { useEffect, useState } from 'react';
import auction, { SellerAuctionRoomListResponse, ItemListDto } from '../../api/auction';
import { useAppSelector } from '../../store/hooks';

export function useSellerBox() {
  const [auctionListBeforeLive, setAuctionListBeforeLive] = useState<SellerAuctionRoomListResponse[]>([]);
  const [auctionListAfterLive, setAuctionListAfterLive] = useState<SellerAuctionRoomListResponse[]>([]);
  const isLogined = useAppSelector(state => state.user.isLogined);

  useEffect(() => {
    auction
      .getSellerAuctionListBeforeLive()
      .then(data => {
        setAuctionListBeforeLive(data);
      })
      .catch(err => {
        console.log(err);
      });
    auction
      .getSellerAuctionListAfterLive()
      .then(data => {
        setAuctionListAfterLive(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return { auctionListBeforeLive, auctionListAfterLive, isLogined };
}
