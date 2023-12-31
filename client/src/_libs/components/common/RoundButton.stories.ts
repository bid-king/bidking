import type { Meta, StoryObj } from '@storybook/react';

import { RoundButton } from './RoundButton';

const meta = {
  title: 'Common/RoundButton',
  component: RoundButton,
  argTypes: {},
} satisfies Meta<typeof RoundButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'confirm',
    size: 'small',
    label: '로그인',
  },
};
