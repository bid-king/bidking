import { useState, ChangeEvent, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

import {
  setAuctionTitle,
  setStartedAt,
  setAuctionRoomType,
  setDeliveryRulesChecked,
  setItemPermissionChecked,
} from '../../store/slices/auctionCreateSlice';

export function useAuctionCreateBox() {
  const dispatch = useAppDispatch();
  const { auctionTitle, startedAt, auctionRoomType, itemPermissionChecked, deliveryRulesChecked, items } =
    useAppSelector(state => state.auctionCreate);

  const handleAuctionTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuctionTitle(e.target.value));
  };

  const handleStartedAt = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const date = new Date(e.target.value + 'Z'); // 'Z'를 추가하여 UTC 시간임을 명시
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
    console.log(formattedDate);
    dispatch(setStartedAt(formattedDate));
  };

  const handleAuctionRoomType = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuctionRoomType(e.target.value));
  };

  const handleItemPermissionChecked = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setItemPermissionChecked());
  };

  const handleDeliveryRulesChecked = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setDeliveryRulesChecked());
  };

  const [image, setImage] = useState<File | null>(null);
  const [itemList, setItemList] = useState<number[]>([0]);
  const addItem = () => {
    setItemList(prevItem => [prevItem.length, ...prevItem]);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return {
    auctionTitle,
    startedAt,
    auctionRoomType,
    itemPermissionChecked,
    deliveryRulesChecked,
    handleAuctionTitle,
    handleStartedAt,
    handleAuctionRoomType,
    handleItemPermissionChecked,
    handleDeliveryRulesChecked,
    image,
    setImage,
    itemList,
    setItemList,
    addItem,
    handleImageChange,
    items,
  };
}
