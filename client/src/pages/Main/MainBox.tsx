/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import auction, { AuctionRoomResponse } from '../../api/auction';
import { Spacing } from '../../_libs/components/common/Spacing';
import { Text } from '../../_libs/components/common/Text';
import colors from '../../_libs/design/colors';
import { AuctionList } from '../../_libs/components/auction/AuctionList';
import { RoundButton } from '../../_libs/components/common/RoundButton';

export function MainBox() {
  interface Category {
    id: number;
    name: string;
  }
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [buttonCategoryList, setButtonCategoryList] = useState<number[]>([]);

  const handleCategoryButtonClick = (categoryId: number) => {
    setButtonCategoryList(prevList =>
      prevList.includes(categoryId) ? prevList.filter(id => id !== categoryId) : [...prevList, categoryId]
    );
  };

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
  const data = {
    categoryList: [],
    keyword: '',
    page: 1,
    perPage: 10,
  };
  useEffect(() => {
    auction
      .getAuctionList(data)
      .then(res => console.log(res))
      .catch(err => {
        console.log(err);
      });
  });

  return (
    <div>
      <div
        css={{
          backgroundColor: colors.backgroundLight2,
          padding: '0.7rem',
          display: 'flex',
          width: '100%',
        }}
      >
        {categoryList.map(category => (
          <div
            key={category.id}
            css={{
              display: 'flex',
            }}
          >
            <RoundButton
              color={buttonCategoryList.includes(category.id) ? 'confirm' : 'white'}
              size="small"
              label={category.name}
              onClick={() => handleCategoryButtonClick(category.id)}
            />
            <Spacing rem="0.5" dir="h" />
          </div>
        ))}
      </div>
      <div
        css={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div>
          <Spacing rem="1" />
          <Text type="h1" content="관심 경매" />
          <div
            css={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <div
              css={{
                marginRight: '1rem',
              }}
            >
              <Spacing rem="1" />
              <AuctionList></AuctionList>
            </div>
            <div
              css={{
                marginRight: '1rem',
              }}
            >
              <Spacing rem="1" />
              <AuctionList></AuctionList>
            </div>
          </div>
        </div>
        <div>
          <Spacing rem="1" />
          <Text type="h1" content="진행 중인 경매" />
          <Spacing rem="1" />
          <div
            css={{
              display: 'flex',
            }}
          >
            <AuctionList></AuctionList>
            <Spacing rem="1" dir="h" />
            <AuctionList></AuctionList>
            <Spacing rem="1" dir="h" />
            <AuctionList></AuctionList>
            <Spacing rem="1" dir="h" />
          </div>
        </div>
        <div>
          <Spacing rem="1" />
          <Text type="h1" content="진행 예정 경매" />
          <Spacing rem="1" />
          <div
            css={{
              display: 'flex',
            }}
          >
            <AuctionList></AuctionList>
            <Spacing rem="1" dir="h" />
            <AuctionList></AuctionList>
            <Spacing rem="1" dir="h" />
            <AuctionList></AuctionList>
            <Spacing rem="1" dir="h" />
          </div>
        </div>
      </div>
    </div>
  );
}
