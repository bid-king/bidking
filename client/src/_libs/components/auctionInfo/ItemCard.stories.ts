import type { Meta, StoryObj } from '@storybook/react';

import { ItemCard } from './ItemCard';

const meta = {
  title: 'Auction/CRUD/ItemCard',
  component: ItemCard,
  argTypes: {},
} satisfies Meta<typeof ItemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    theme: 'dark',
    item: {
      itemId: 1,
      itemName: '낙찰된 상품명',
      category: '카테고리',
      itemImageUrl: '/image/bid.jpg',
      itemDescription: '상품 설명',
      itemOrdering: 1,
      itemState: 'PRE_AUCTION',
      successTime: '2023-03-03 22:00:00',
      successPrice: 4000,
      successMemberNickname: '윤다정',
      deliveryAddress: '서울시 우리 집',
      deliveryMsg: '잘 보내주세요',
      invoice: { courier: 'LOGEN', invoiceNumber: '1313242435354646' },
    },
  },
};
