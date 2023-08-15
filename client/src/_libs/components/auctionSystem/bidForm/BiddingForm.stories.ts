import type { Meta, StoryObj } from '@storybook/react';

import { BiddingForm } from './BiddingForm';

const meta = {
  title: 'Auction/System/BiddingForm',
  component: BiddingForm,
  argTypes: {},
} satisfies Meta<typeof BiddingForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { theme: 'light', currPrice: 12345, askingPrice: 1211000, disable: false, auctionRoomId: 3, itemId: 2 },
};
