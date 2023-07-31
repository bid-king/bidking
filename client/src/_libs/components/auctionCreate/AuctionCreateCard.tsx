/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useState, ChangeEvent } from 'react';
import colors from '../../design/colors';
import { Text } from '../common/Text';
import { Input } from '../common/Input';
import { Spacing } from '../common/Spacing';
import { TextArea } from '../common/TextArea';

interface Props extends HTMLAttributes<HTMLDivElement> {
  item: {
    itemId: string;
    itemName: string;
    category: string;
    itemImage: string;
    itemDescription: string;
    itemOrdering: string;
  };
}

export function AuctionCreateCard({
  item = {
    itemId: '1',
    itemName: '낙찰된 상품명',
    category: '카테고리',
    itemImage: 'img src',
    itemDescription: '상품 설명',
    itemOrdering: '1',
  },
}: Props) {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
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
      <div
        className="cardHeader"
        css={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text type="bold" content={'순번 ' + item.itemOrdering} />
      </div>
      <Spacing rem="1" />
      <div className="cardBody-ItemName">
        <Input placeholder="물품명" />
      </div>
      <Spacing rem="1" />

      <div>
        <div>
          <Input placeholder="카테고리" />
        </div>
        <Spacing rem="1" />

        <div>
          <Input placeholder="경매시작가" />
        </div>
        <Spacing rem="1" />

        <div className="auction-image">
          <Text type="bold" content="물품 대표사진을 등록하세요" />
          <Spacing rem="1" />
          <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {image && <p>Selected image: {image.name}</p>}
          </div>
        </div>
        <Spacing rem="1" />

        <TextArea placeholder="물품 설명(500자 이내)" />
      </div>
    </div>
  );
}
