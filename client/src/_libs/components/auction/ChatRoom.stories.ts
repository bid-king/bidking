import type { Meta, StoryObj } from '@storybook/react';

import { ChatRoom } from './ChatRoom';

const meta = {
  title: 'Auction/CRUD/ChatRoom',
  component: ChatRoom,
  argTypes: {},
} satisfies Meta<typeof ChatRoom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    roomId: 1,
    nickname: '정예지',
    theme: 'light',
    userType: 'order',
    socket: { current: null },
  },
};
