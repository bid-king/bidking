import { useState, ChangeEvent, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import axios from 'axios';
import {
  setAuctionTitle,
  setStartedAt,
  setAuctionRoomType,
  setDeliveryRulesChecked,
  setItemPermissionChecked,
} from '../../store/slices/auctionCreateSlice';
import { getToken, API_URL } from '../util/http';

export function useAuctionCreateBox() {
  const dispatch = useAppDispatch();
  const { auctionTitle, startedAt, auctionRoomType, itemPermissionChecked, deliveryRulesChecked, items } =
    useAppSelector(state => state.auctionCreate);

  const handleAuctionTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuctionTitle(e.target.value));
  };

  const handleStartedAt = (e: ChangeEvent<HTMLInputElement>) => {
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

  const getOrderedItemImgs = (itemImgs: Record<string, File>): File[] => {
    const orderedKeys = Object.keys(itemImgs).sort((a, b) => Number(a) - Number(b));
    return orderedKeys.map(key => itemImgs[key]);
  };

  const itemImgs = useAppSelector(state => state.auctionCreateItemImgs.itemImgs);
  const isLogined = useAppSelector(state => state.user.isLogined);

  async function createAuction() {
    const data = {
      auctionTitle,
      startedAt: startedAt,
      auctionRoomType,
      itemPermissionChecked,
      deliveryRulesChecked,
      itemList: items,
    };
    if (data && isLogined) {
      const formData = new FormData();
      formData.append('auctionCreateRequest', new Blob([JSON.stringify(data)], { type: 'application/json' }));

      if (image) {
        formData.append('auctionRoomImg', image);
      }

      getOrderedItemImgs(itemImgs).forEach((file, index) => {
        formData.append('itemImgs', file);
      });

      const token = await getToken();

      axios
        .post(`${API_URL}/api/v1/auctions`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

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
    createAuction,
    itemImgs,
    isLogined,
    getOrderedItemImgs,
  };
}
