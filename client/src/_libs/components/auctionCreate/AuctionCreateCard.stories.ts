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
      name: '낙찰된 상품명',
      itemCategory: '카테고리',
      itemImg: '/public/image/Bell_dark.png',
      description: '상품 설명',
      startPrice: '10000',
      ordering: 1,
    },
  },
};
