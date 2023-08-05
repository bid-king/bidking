import { ChangeEvent, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addItemToList } from '../../store/slices/auctionUpdateSlice';
import { setItemImg } from '../../store/slices/auctionUpdateItemImgSlice';
import axios from 'axios';
import auction from '../../api/auction';

export function useAuctionUpdateCard(ordering: number) {
  interface Item {
    name?: string;
    category?: string;
    startPrice?: string;
    description?: string;
    itemId?: number;
    isChanged?: boolean;
  }
  const auctionUpdateState = useAppSelector(state => state.auctionUpdate.items);
  const item: Item = auctionUpdateState.find(item => item.ordering === ordering) || {};
  const [name, setName] = useState(item?.name || '');
  const [itemCategory, setItemCategory] = useState(item.category || '1');
  const [startPrice, setStartPrice] = useState(item.startPrice || '');
  const [description, setDescription] = useState(item.description || '');
  const [itemId, setItemId] = useState(item.itemId);
  const [itemOrdering, setItemOrdering] = useState(ordering);
  const [isImageChanged, setIsImageChanged] = useState(item.isChanged || false);
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  interface Category {
    id: number;
    name: string;
  }

  const [categoryList, setCategoryList] = useState<Category[]>([]);

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

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleItemCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setItemCategory(e.target.value);
  };
  const handleStartPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setStartPrice(e.target.value);
  };

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleItemImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch(setItemImg({ id: itemOrdering.toString(), file: e.target.files[0] }));
      setIsImageChanged(true);
      const url = URL.createObjectURL(e.target.files[0]);
      setPreviewImageURL(url);
    } else {
      setIsImageChanged(false);
    }
  };

  useEffect(() => {
    dispatch(
      addItemToList({
        name: name,
        itemCategory: itemCategory,
        description: description,
        startPrice: startPrice,
        ordering: itemOrdering,
        itemId: itemId,
        isChanged: isImageChanged,
      })
    );
  }, [name, startPrice, description, itemCategory, isImageChanged]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    handleName(event);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setItemCategory(event.target.value as string);
    handleItemCategory(event);
  };

  const handleStartPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartPrice(event.target.value);
    handleStartPrice(event);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
    handleDescription(event);
  };

  return {
    name,
    itemCategory,
    startPrice,
    description,
    handleItemImg,
    handleName,
    handleItemCategory,
    handleStartPrice,
    handleDescription,
    itemOrdering,
    categoryList,
    handleNameChange,
    handleCategoryChange,
    handleStartPriceChange,
    handleDescriptionChange,
    previewImageURL,
  };
}
