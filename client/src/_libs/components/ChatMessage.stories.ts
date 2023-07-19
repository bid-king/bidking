import type { Meta, StoryObj } from '@storybook/react';

import { ChatMessage } from './ChatMessage';
import bid from '../static/bid.jpg';

const meta = {
  title: 'Components/ChatMessage',
  component: ChatMessage,
  argTypes: {},
} satisfies Meta<typeof ChatMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    message: '이름: 저는 입찰왕입니다.',
    bidProgress: '<낙찰> 입찰왕님 30,000원',
    bidSuccess: '<입찰> 입찰왕님 23,000원',
  },
};
