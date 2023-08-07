import type { Meta, StoryObj } from '@storybook/react';

import { AuctionTitle } from './AuctionTitle';

const meta = {
  title: 'Auction/Live/AuctionTitle',
  component: AuctionTitle,
  argTypes: {},
} satisfies Meta<typeof AuctionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { theme: 'dark', nickname: '김성용', auctionRoomType: '네덜란드', title: '제목' },
};
