import type { Meta, StoryObj } from '@storybook/react';

import { Spacing } from './Spacing';

const meta = {
  title: 'Common/Spacing',
  component: Spacing,
  argTypes: {},
} satisfies Meta<typeof Spacing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    rem: '1',
  },
};
