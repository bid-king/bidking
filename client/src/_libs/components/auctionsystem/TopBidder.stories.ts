import type { Meta, StoryObj } from '@storybook/react';

import { TopBidder } from './TopBidder';

const meta = {
  title: 'Auction/System/TopBidder',
  component: TopBidder,
  argTypes: {},
} satisfies Meta<typeof TopBidder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { theme: 'light' },
};
export const Dark: Story = {
  args: { theme: 'dark' },
};
