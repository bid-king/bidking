import { ChangeEvent, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addItemToList } from '../../store/slices/auctionCreateSlice';
import { setItemImg } from '../../store/slices/auctionCreateItemImgSlice';

const useAuctionCreateCard = (ordering: number) => {
  const [name, setName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [startPrice, setStartPrice] = useState('');
  const [description, setDescription] = useState('');
  const [itemOrdering] = useState(ordering);
  const dispatch = useAppDispatch();

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleItemCategory = (e: ChangeEvent<HTMLInputElement>) => {
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
      dispatch(setItemImg(e.target.files[0]));
    }
  };

  useEffect(() => {
    if (name && itemCategory && startPrice && description) {
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
  }, [name, itemCategory, startPrice, description]);

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
  };
};

export default useAuctionCreateCard;
