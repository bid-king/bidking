import type { Meta, StoryObj } from '@storybook/react';

import { AuctionCreateCard } from './AuctionCreateCard';

const meta = {
  title: 'Auction/CRUD/AuctionCreateCard',
  component: AuctionCreateCard,
  argTypes: {},
} satisfies Meta<typeof AuctionCreateCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    item: {
      itemId: '1',
      itemName: '낙찰된 상품명',
      category: '카테고리',
      itemImage: 'img src',
      itemDescription: '상품 설명',
      itemOrdering: '1',
    },
  },
};
