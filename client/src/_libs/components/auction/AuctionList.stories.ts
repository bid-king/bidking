import type { Meta, StoryObj } from '@storybook/react';

import { AuctionList } from './AuctionList';
import bid from '../static/bid.jpg';

const meta = {
  title: 'Auction/CRUD/AuctionList',
  component: AuctionList,
  argTypes: {},
} satisfies Meta<typeof AuctionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    theme: 'light',
    title: '경매제목',
    date: '오늘 18:00',
    items: ['물품1', '물품2', '물품3', '물품4', '물품5', '물품6'],
    auctionRoomTradeState: 'NONE',
    img: '/image/bid.jpg',
  },
};
