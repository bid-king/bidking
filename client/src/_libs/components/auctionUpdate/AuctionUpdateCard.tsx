/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useState, ChangeEvent, useEffect } from 'react';
import colors from '../../design/colors';
import { Text } from '../common/Text';
import { Input } from '../common/Input';
import { Spacing } from '../common/Spacing';
import { TextArea } from '../common/TextArea';
import { useAuctionUpdateCard } from '../../hooks/useAuctionUpdateCard';
import { Select, SelectOption } from '../common/SelectOption';
import { useAppSelector } from '../../../store/hooks';
import AuctionItem from '../../../store/slices/auctionUpdateSlice';
import { Image } from '../common/Image';

interface Props {
  ordering: number;
}

export function AuctionUpdateCard({ ordering }: Props) {
  const {
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
  } = useAuctionUpdateCard(ordering);

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
        <Text type="bold" content={'순번' + ordering} />
      </div>
      <Spacing rem="1" />
      <div className="cardBody-name">
        <Input value={name} placeholder="물품명" onChange={handleNameChange} />
      </div>
      <Spacing rem="1" />

      <div>
        <Select value={itemCategory} onChange={handleCategoryChange}>
          {categoryList.map(category => (
            <SelectOption value={category.id} key={category.id}>
              {category.name}
            </SelectOption>
          ))}
        </Select>
        <Spacing rem="1" />

        <div>
          <Input value={startPrice} inputType="number" placeholder="경매시작가" onChange={handleStartPriceChange} />
        </div>
        <Spacing rem="1" />

        <div className="auction-image">
          <Text type="bold" content="물품 대표사진을 등록하세요" />
          <Spacing rem="1" />
          <div>
            <Image src={previewImageURL ? previewImageURL : '#'} alt="" />

            <input type="file" accept="image/*" onChange={handleItemImg} />
          </div>
        </div>
        <Spacing rem="1" />
        <TextArea value={description} placeholder="물품 설명(500자 이내)" onChange={handleDescriptionChange} />
      </div>
    </div>
  );
}
