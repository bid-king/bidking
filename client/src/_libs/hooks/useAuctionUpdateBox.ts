import { useState, ChangeEvent, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import axios from 'axios';
import auction, { AuctionRoomResponse } from '../../api/auction';
import {
  setAuctionTitle,
  setStartedAt,
  setAuctionRoomType,
  setDeliveryRulesChecked,
  setItemPermissionChecked,
  resetAuctionUpdate,
  setAuctionItem,
} from '../../store/slices/auctionUpdateSlice';

import { ROOT } from '../util/http';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { transformToAuctionItem, OriginalItem, AuctionItem } from '../util/transformToAuctionItem';

export function useAuctionUpdateBox() {
  // 1. Hooks and selectors
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { auctionTitle, startedAt, auctionRoomType, itemPermissionChecked, deliveryRulesChecked, items } =
    useAppSelector(state => state.auctionUpdate);
  const itemImgs = useAppSelector(state => state.auctionUpdateItemImgs.itemImgs);
  const isLogined = useAppSelector(state => state.user.isLogined);
  const params = useParams<string>();
  const auctionId = Number(params.auctionId);
  const token = useAppSelector(state => state.user.accessToken);

  // 2. State
  const [image, setImage] = useState<File[]>([]);
  const [errMessage, SetErrMessage] = useState('');
  const [detail, setDetail] = useState<AuctionRoomResponse | undefined>(undefined);
  const [auctionRoomUrl, setAuctionRoomUrl] = useState('');
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);

  // 4. Handlers
  const handleAuctionTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuctionTitle(e.target.value));
  };

  const handleStartedAt = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setStartedAt(e.target.value));
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(prevImages => [...prevImages, files[0]]);
      const url = URL.createObjectURL(files[0]);
      setPreviewImageURL(url);
    }
  };

  // 5. Utility function
  const getOrderedItemImgs = (itemImgs: Record<string, File>): File[] => {
    const orderedKeys = Object.keys(itemImgs).sort((a, b) => Number(a) - Number(b));
    return orderedKeys.map(key => itemImgs[key]);
  };

  async function updateAuction() {
    const data = {
      auctionTitle,
      startedAt: startedAt,
      auctionRoomType,
      imageUrl: 'tempImageURL.jpg',
      itemPermissionChecked,
      deliveryRulesChecked,
      itemList: items.map(item => {
        if ('itemId' in item) {
          // AuctionItem 타입
          return {
            ...item,
            id: item.itemId,
            itemName: item.name,
            itemCategoryId: item.itemCategory,
          };
        } else {
          // AuctionCreateItem 타입
          return {
            ...item,
            itemName: item.name,
            itemCategoryId: item.itemCategory,
          };
        }
      }),
    };
    if (data && isLogined) {
      const formData = new FormData();
      formData.append('auctionUpdateRequest', new Blob([JSON.stringify(data)], { type: 'application/json' }));

      image.forEach(img => {
        formData.append('auctionRoomImg', img);
      });

      getOrderedItemImgs(itemImgs).forEach((file, index) => {
        formData.append('itemImgs', file);
      });

      axios
        .put(`${ROOT}/api/v1/auctions/${auctionId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          navigate(`/seller/detail/${auctionId}`);
        })
        .catch(err => {
          console.log(err);
          SetErrMessage(err.response.data.message);
          // navigate('/login/loading'); // 404페이지로 넘어가야함
        });
    }
  }

  useEffect(() => {
    auction
      .get(auctionId, token)
      .then(data => {
        setDetail(data);
        dispatch(setAuctionTitle(data.name));
        dispatch(setAuctionRoomType(data.auctionRoomType));
        dispatch(setStartedAt(data.startedAt));
        setAuctionRoomUrl(data.imageURL);
        const originalData: OriginalItem[] = data.itemList;
        const auctionItemList: AuctionItem[] = originalData.map(transformToAuctionItem);
        dispatch(setAuctionItem(auctionItemList));
      })
      .catch(err => console.log(err));
  }, [auctionId]);

  useEffect(() => {
    return () => {
      dispatch(resetAuctionUpdate());
    };
  }, [dispatch]);

  return {
    auctionId,
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
    handleImageChange,
    items,
    updateAuction,
    itemImgs,
    isLogined,
    getOrderedItemImgs,
    errMessage,
    detail,
    auctionRoomUrl,
    previewImageURL,
  };
}
