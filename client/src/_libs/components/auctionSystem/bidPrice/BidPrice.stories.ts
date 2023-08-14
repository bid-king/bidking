import type { Meta, StoryObj } from '@storybook/react';

import { BidPrice } from './BidPrice';

const meta = {
  title: 'Auction/System/BidPrice',
  component: BidPrice,
  argTypes: {},
} satisfies Meta<typeof BidPrice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    priceArr: ['1', '2', ',', '3', '5', '4'],
    align: 'center',
    theme: 'light',
  },
};
