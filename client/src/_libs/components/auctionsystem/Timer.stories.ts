import type { Meta, StoryObj } from '@storybook/react';

import { Timer } from './Timer';

const meta = {
  title: 'Auction/System/Timer',
  component: Timer,
  argTypes: {},
} satisfies Meta<typeof Timer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { theme: 'light' },
};
