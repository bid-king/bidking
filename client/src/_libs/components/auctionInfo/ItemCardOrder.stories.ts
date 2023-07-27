import type { Meta, StoryObj } from '@storybook/react';

import { ItemCardOrder } from './ItemCardOrder';

const meta = {
  title: 'Auction/CRUD/ItemCardOrder',
  component: ItemCardOrder,
  argTypes: {},
} satisfies Meta<typeof ItemCardOrder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    theme: 'light',
    item: {
      sellerName: '유승윤',
      currentState: 'PAYMENT_WAITING',
      order: {
        orderId: '1',
        orderAt: 'yyyy-mm-dd hh:mm:ss',
        auctionRoomId: '4',
        price: '300000000',
      },
      delivery: {
        deliveryId: '3',
        deliveryMsg: '문앞에두고가삼',
        address: {
          street: '서울특별시 강남구 테헤란로 212',
          details: '1501호',
          zipcode: '12345',
        },
      },
      item: {
        itemId: '2',
        name: '아이폰 29 pro',
        description: '뉴아이폰',
        image: {
          id: '1',
          createdAt: 'yyyy-mm-dd hh:mm:ss',
          fileName: 'asdf.jpg',
          filePath: '/image/bid.jpg',
        },
      },
    },
  },
};
