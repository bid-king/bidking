import type { Meta, StoryObj } from '@storybook/react';

import { ItemCardSeller } from './ItemCardSeller';

const meta = {
  title: 'Detail/ItemCardSeller',
  component: ItemCardSeller,
  argTypes: {},
} satisfies Meta<typeof ItemCardSeller>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    theme: 'dark',
    item: {
      itemId: '1',
      itemName: '낙찰된 상품명',
      category: '카테고리',
      itemImage: '/image/bid.jpg',
      itemDescription: '상품 설명',
      itemOrdering: '1',
      paymentState: 'PAYMENT_OK',
      successTime: '2023-03-03 22:00:00',
      successPrice: '4000',
      successMemberNickname: '윤다정',
      deliveryAddress: '서울시 우리 집',
      deliveryMsg: '잘 보내주세요',
      invoice: { courier: 'LOGEN', invoiceNumber: '1313242435354646' },
    },
  },
};
