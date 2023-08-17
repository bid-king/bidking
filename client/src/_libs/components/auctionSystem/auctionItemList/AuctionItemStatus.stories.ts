import type { Meta, StoryObj } from '@storybook/react';

import { AuctionItemStatus } from './AuctionItemStatus';

const meta = {
  title: 'Auction/Live/AuctionItemStatus',
  component: AuctionItemStatus,
  argTypes: {},
} satisfies Meta<typeof AuctionItemStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    theme: 'dark',
    itemList: [
      {
        imageUrl: 'abc',
        name: '김성용의 안경',
        status: 'complete',
        desc: '안녕 난 안경이야',
        itemId: 1,
        startPrice: 5000,
      },
      {
        imageUrl: 'abc',
        name: '정예지의 샷건',
        status: 'complete',
        desc: '안녕 난 키보드야',
        itemId: 2,
        startPrice: 5000,
      },
      {
        imageUrl: 'abc',
        name: '윤다정의 갤럭시 버즈',
        status: 'fail',
        desc: '안녕 난 이어폰이야',
        itemId: 3,
        startPrice: 5000,
      },
      {
        imageUrl: 'abc',
        name: '유승윤의 스타벅스 커피 ',
        status: 'in',
        desc: '안녕 난 키보드야',
        itemId: 4,
        startPrice: 5000,
      },
      {
        imageUrl: 'abc',
        name: '김동현의 스탠리 텀블러',
        status: 'before',
        desc: '안녕 난 키보드야',
        itemId: 5,
        startPrice: 5000,
      },
      {
        imageUrl: 'abc',
        name: '김성용의 안경',
        status: 'before',
        desc: '안녕 난 안경이야',
        itemId: 6,
        startPrice: 5000,
      },
      {
        imageUrl: 'abc',
        name: '정예지의 샷건',
        status: 'before',
        desc: '안녕 난 키보드야',
        itemId: 7,
        startPrice: 5000,
      },
      {
        imageUrl: 'abc',
        name: '윤다정의 갤럭시 버즈',
        status: 'before',
        desc: '안녕 난 이어폰이야',
        itemId: 8,
        startPrice: 5000,
      },
      {
        imageUrl: 'abc',
        name: '유승윤의 스타벅스 커피 ',
        status: 'before',
        desc: '안녕 난 키보드야',
        itemId: 9,
        startPrice: 5000,
      },
      {
        imageUrl: 'abc',
        name: '김동현의 스탠리 텀블러',
        status: 'before',
        desc: '안녕 난 키보드야',
        itemId: 10,
        startPrice: 5000,
      },
    ],
    currentItemId: 3,
    order: 2,
  },
};
