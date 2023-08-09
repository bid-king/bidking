import { ChangeEvent, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addItemToList } from '../../store/slices/auctionCreateSlice';
import { setItemImg } from '../../store/slices/auctionCreateItemImgSlice';
import axios from 'axios';
import auction from '../../api/auction';

export function useAuctionCreateCard(ordering: number) {
  const [name, setName] = useState('');
  const [itemCategory, setItemCategory] = useState('1');
  const [startPrice, setStartPrice] = useState('');
  const [description, setDescription] = useState('');
  const [itemOrdering] = useState(ordering);
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
      const url = URL.createObjectURL(e.target.files[0]);
      setPreviewImageURL(url);
    }
  };

  useEffect(() => {
    if (name && startPrice && description) {
      dispatch(
        addItemToList({
          name: name,
          itemCategory: itemCategory,
          description: description,
          startPrice: startPrice,
          ordering: itemOrdering,
        })
      );
    }
  }, [name, startPrice, description]);

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
    previewImageURL,
  };
}

export default useAuctionCreateCard;
