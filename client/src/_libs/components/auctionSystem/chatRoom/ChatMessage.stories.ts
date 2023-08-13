import type { Meta, StoryObj } from '@storybook/react';

import { ChatMessage } from './ChatMessage';

const meta = {
  title: 'Auction/CRUD/ChatMessage',
  component: ChatMessage,
  argTypes: {},
} satisfies Meta<typeof ChatMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    nickname: '정예지',
    msg: '이건 사야하는 것 아닌가요',
  },
};
