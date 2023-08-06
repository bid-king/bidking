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
    ordering: 1,
  },
};
