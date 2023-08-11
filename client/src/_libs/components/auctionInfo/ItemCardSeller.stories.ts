import type { Meta, StoryObj } from '@storybook/react';

import { ItemCardSeller } from './ItemCardSeller';

const meta = {
  title: 'Auction/CRUD/ItemCardSeller',
  component: ItemCardSeller,
  argTypes: {},
} satisfies Meta<typeof ItemCardSeller>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    theme: 'dark',
    item: {
      itemId: 1,
      itemName: 'Sample Item',
      category: 'electronics',
      price: 1000,
      itemImageUrl: 'path/to/image.jpg',
      itemDescription: 'This is a sample item for demonstration.',
      itemOrdering: 1,
      successTime: '2023-08-10 12:00:00',
      successMemberId: 1,
      successMemberNickname: 'JohnDoe',
      deliveryAddress: '123 Sample Street, Sample City, Country',
      deliveryMsg: 'Please handle with care.',
      orderState: 'DELIVERY_WAITING',
      invoice: {
        courier: 'DHL',
        invoiceNumber: '456789123',
      },
    },
  },
};
