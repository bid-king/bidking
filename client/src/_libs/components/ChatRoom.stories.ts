import type { Meta, StoryObj } from '@storybook/react';

import { ChatRoom } from './ChatRoom';

const meta = {
  title: 'Components/ChatRoom',
  component: ChatRoom,
  argTypes: {},
} satisfies Meta<typeof ChatRoom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    theme: 'light',
    message: '이름: 저는 입찰왕입니다.',
    systemLog: '<낙찰> 입찰왕님 30,000원',
  },
};
