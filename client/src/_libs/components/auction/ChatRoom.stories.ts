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
    theme: 'light',
    userType: 'order',
    api: {},
  },
};
