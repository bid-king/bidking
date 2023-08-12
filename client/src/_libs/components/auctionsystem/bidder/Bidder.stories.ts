import type { Meta, StoryObj } from '@storybook/react';

import { Bidder } from './Bidder';

const meta = {
  title: 'Auction/System/Bidder',
  component: Bidder,
  argTypes: {},
} satisfies Meta<typeof Bidder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { theme: 'light', bidder: '정예지' },
};

export const Dark: Story = {
  args: { theme: 'dark', bidder: '정예지' },
};
