import { ChangeEvent, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addCreateItemToList } from '../../store/slices/auctionUpdateSlice';
import { setItemImg } from '../../store/slices/auctionUpdateItemImgSlice';
import axios from 'axios';
import auction from '../../api/auction';

export function useAuctionUpdateCreateCard(ordering: number) {
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [name, setName] = useState('');
  const [itemCategory, setItemCategory] = useState('1');
  const [startPrice, setStartPrice] = useState('');
  const [description, setDescription] = useState('');
  const [itemOrdering] = useState(ordering);
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
    } else {
      setIsImageChanged(false);
    }
  };

  useEffect(() => {
    dispatch(
      addCreateItemToList({
        name: name,
        itemCategory: itemCategory,
        description: description,
        startPrice: startPrice,
        ordering: itemOrdering,
        isChanged: isImageChanged,
      })
    );
  }, [name, startPrice, description, itemCategory, isImageChanged]);

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
  };
}
