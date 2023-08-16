import type { Meta, StoryObj } from '@storybook/react';

import { AuctionHeader } from './AuctionHeader';

const meta = {
  title: 'Auction/Live/AuctionHeader',
  component: AuctionHeader,
  argTypes: {},
} satisfies Meta<typeof AuctionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    userType: 'order',
    theme: 'dark',
    sellerNickname: '김성용',
    auctionRoomType: 'REVERSE',
    title: '제목',
  },
};
