import type { Meta, StoryObj } from '@storybook/react';

import { AuctionSystem } from './AuctionSystem';

const meta = {
  title: 'Auction/System/AuctionSystem',
  component: AuctionSystem,
  argTypes: {},
} satisfies Meta<typeof AuctionSystem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { theme: 'dark', nickname: '정예지', auctionRoomId: 3, socket: { current: null } },
};
