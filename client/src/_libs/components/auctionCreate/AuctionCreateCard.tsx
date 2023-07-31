/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useState, ChangeEvent, useEffect } from 'react';
import colors from '../../design/colors';
import { Text } from '../common/Text';
import { Input } from '../common/Input';
import { Spacing } from '../common/Spacing';
import { TextArea } from '../common/TextArea';

interface Item {
  name: string;
  itemCategory: string;
  description: string;
  startPrice: string;
  ordering: number;
  itemImg: string;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  item: {
    name: string;
    itemCategory: string;
    description: string;
    startPrice: string;
    ordering: number;
    itemImg: string;
  };
  onItemChange: (item: Item) => void;
}

export function AuctionCreateCard({
  item = {
    name: '',
    itemCategory: '',
    itemImg: '',
    description: '',
    startPrice: '',
    ordering: 1,
  },
  onItemChange,
}: Props) {
  const [name, setName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [startPrice, setStartPrice] = useState('');
  const [description, setDescription] = useState('');
  const [itemImg, setItemImage] = useState<string>('');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (event) {
        // The file's text will be printed here
        setItemImage(event?.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleItem = () => {
    if (!name || !itemCategory || !startPrice || !description || !itemImg) {
      alert('모든 필드를 입력해주세요!');
    } else {
      // console.log({ name, itemCategory, startPrice, description, itemImg, ordering: item.ordering });
      onItemChange({ name, itemCategory, startPrice, description, itemImg, ordering: item.ordering });
    }
  };

  return (
    <div
      className="container"
      css={{
        backgroundColor: colors.backgroundDark3,
        border: `1px solid ${colors.backgroundDark3}`,
        color: colors.white,
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        borderRadius: '1rem',
      }}
    >
      <button onClick={handleItem}>저장</button>
      <div
        className="cardHeader"
        css={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text type="bold" content={'순번 ' + item.ordering} />
      </div>
      <Spacing rem="1" />
      <div className="cardBody-name">
        <Input placeholder="물품명" onChange={e => setName(e.target.value)} />
      </div>
      <Spacing rem="1" />

      <div>
        <div>
          <Input placeholder="카테고리" onChange={e => setItemCategory(e.target.value)} />
        </div>
        <Spacing rem="1" />

        <div>
          <Input placeholder="경매시작가" onChange={e => setStartPrice(e.target.value)} />
        </div>
        <Spacing rem="1" />

        <div className="auction-image">
          <Text type="bold" content="물품 대표사진을 등록하세요" />
          <Spacing rem="1" />
          <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {itemImg && <p>Selected image: {itemImg}</p>}
          </div>
        </div>
        <Spacing rem="1" />
        <TextArea placeholder="물품 설명(500자 이내)" onChange={e => setDescription(e.target.value)} />
      </div>
    </div>
  );
}
