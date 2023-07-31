import type { Meta, StoryObj } from '@storybook/react';

import { QuestionModal } from './QuestionModal';

const meta = {
  title: 'Auction/CRUD/QuestionModal',
  component: QuestionModal,
  argTypes: {},
} satisfies Meta<typeof QuestionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    content1: '첫번째 문단입니다.',
    content2: '두번째 문단입니다.',
  },
};
