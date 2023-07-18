import type { Meta, StoryObj } from '@storybook/react';

import { DetailBox } from './DetailBox';

const meta = {
  title: 'Components/DetailBox',
  component: DetailBox,
  argTypes: {},
} satisfies Meta<typeof DetailBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: '이건 경매제목입니다.',
    theme: 'light',
  },
};
