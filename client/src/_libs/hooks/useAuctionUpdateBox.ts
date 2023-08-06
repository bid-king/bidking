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
  addItemToList,
} from '../../store/slices/auctionUpdateSlice';

import { getToken, API_URL } from '../util/http';
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

  // 2. State
  const [image, setImage] = useState<File[]>([]);
  // const [itemList, setItemList] = useState<number[]>([0]);
  const [errMessage, SetErrMessage] = useState('');
  const [detail, setDetail] = useState<AuctionRoomResponse | undefined>(undefined);
  const [auctionRoomUrl, setAuctionRoomUrl] = useState('');
  const getOrderingRef = useRef<number>(0);
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);

  // 3. Function to add item
  // const handleAddItem = () => {
  //   const maxOrdering = items.reduce((max, current) => Math.max(max, current.ordering), 0);
  //   const newItem = {
  //     name: '',
  //     itemCategory: '1',
  //     description: '',
  //     startPrice: '',
  //     itemId: undefined,
  //     ordering: maxOrdering + 1,
  //     isChanged: false,
  //   };
  //   dispatch(addItemToList(newItem));
  // };

  // 4. Handlers
  const handleAuctionTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuctionTitle(e.target.value));
  };

  const handleStartedAt = (e: ChangeEvent<HTMLInputElement>) => {
    // const date = new Date(e.target.value + 'Z');
    // const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
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
      console.log(image);

      getOrderedItemImgs(itemImgs).forEach((file, index) => {
        formData.append('itemImgs', file);
      });

      const token = await getToken();

      axios
        .put(`${API_URL}/api/v1/auctions/${auctionId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          console.log(res);
          navigate(`/seller/detail/${res.data.id}`);
        })
        .catch(err => {
          console.log(data);
          SetErrMessage(err.response.data.message);
        });
    }
  }

  useEffect(() => {
    auction
      .get(auctionId)
      .then(data => {
        setDetail(data);
        dispatch(setAuctionTitle(data.name));
        dispatch(setAuctionRoomType(data.auctionRoomType));
        dispatch(setStartedAt(data.startedAt));
        setAuctionRoomUrl(data.imageURL);
        const originalData: OriginalItem[] = data.itemList;
        const auctionItemList: AuctionItem[] = originalData.map(transformToAuctionItem);
        dispatch(setAuctionItem(auctionItemList));
        getOrderingRef.current = data.itemList.length;
      })
      .catch(err => console.log(err));
  }, [auctionId]);

  useEffect(() => {
    return () => {
      dispatch(resetAuctionUpdate());
    };
  }, [dispatch]);

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
    // itemList,
    // setItemList,
    handleImageChange,
    items,
    updateAuction,
    itemImgs,
    isLogined,
    getOrderedItemImgs,
    errMessage,
    detail,
    auctionRoomUrl,
    getOrderingRef,
    previewImageURL,
  };
}
